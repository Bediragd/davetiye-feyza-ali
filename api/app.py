"""RSVP yanıtlarını /data/rsvp.txt dosyasına yazar."""

import os
from datetime import datetime, timezone, timedelta

from flask import Flask, jsonify, request

app = Flask(__name__)

RSVP_FILE = os.environ.get("RSVP_FILE", "/data/rsvp.txt")
TZ = timezone(timedelta(hours=3))  # Türkiye saati


def format_entry(payload: dict) -> str:
    attending = payload.get("attending")
    attending_text = (
        "Evet, katılacağım"
        if attending == "yes"
        else "Maalesef katılamayacağım"
    )
    name = (payload.get("name") or "").strip() or "(belirtilmedi)"
    guests = (payload.get("guests") or "").strip()
    note = (payload.get("note") or "").strip()

    now = datetime.now(TZ).strftime("%d.%m.%Y %H:%M:%S")
    lines = [
        "=" * 52,
        f"Tarih      : {now}",
        f"Ad Soyad   : {name}",
        f"Katılım    : {attending_text}",
    ]
    if attending == "yes" and guests:
        lines.append(f"Kişi sayısı: {guests}")
    if note:
        lines.append(f"Mesaj      : {note}")
    lines.append("")
    return "\n".join(lines)


@app.post("/api/rsvp")
def save_rsvp():
    data = request.get_json(silent=True) or {}

    name = (data.get("name") or "").strip()
    attending = data.get("attending")
    note = (data.get("note") or "").strip()

    if not name:
        return jsonify({"ok": False, "error": "Ad soyad gerekli."}), 400
    if attending not in ("yes", "no"):
        return jsonify({"ok": False, "error": "Katılım durumu seçin."}), 400

    guests = data.get("guests")
    if attending == "yes":
        try:
            guests = int(guests)
            if guests < 1 or guests > 20:
                raise ValueError
        except (TypeError, ValueError):
            return jsonify({"ok": False, "error": "Geçerli kişi sayısı girin."}), 400
    else:
        guests = None

    entry = format_entry(
        {
            "name": name,
            "attending": attending,
            "guests": str(guests) if guests is not None else "",
            "note": note,
        }
    )

    os.makedirs(os.path.dirname(RSVP_FILE), exist_ok=True)
    with open(RSVP_FILE, "a", encoding="utf-8") as f:
        f.write(entry)

    return jsonify({"ok": True})


@app.get("/api/health")
def health():
    return jsonify({"ok": True})
