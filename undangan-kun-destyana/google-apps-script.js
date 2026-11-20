/**
 * Backend RSVP & Ucapan untuk undangan Kun & Destyana (Google Sheets + Apps Script).
 *
 * Cara pasang:
 * 1. Buat Google Sheet baru → menu Extensions → Apps Script.
 * 2. Hapus isi Code.gs, tempel seluruh file ini, lalu Save.
 * 3. Deploy → New deployment → pilih jenis "Web app".
 *      Execute as : Me
 *      Who has access : Anyone
 *    Klik Deploy, izinkan akses, lalu salin "Web app URL".
 * 4. Tempel URL itu ke CONFIG.endpoint di index.html.
 *
 * Data masuk ke dua tab: "RSVP" dan "Ucapan" (dibuat otomatis).
 */

function sheet_(name, header) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(header); sh.setFrozenRows(1); }
  return sh;
}

// Cegah teks tamu dibaca sebagai rumus spreadsheet
function clean_(v, max) {
  let s = String(v == null ? "" : v).slice(0, max || 500);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || "{}");
    if (d.type === "rsvp") {
      sheet_("RSVP", ["Waktu", "Nama", "Jumlah Tamu", "Kehadiran"])
        .appendRow([new Date(), clean_(d.name, 80), clean_(d.count, 3), clean_(d.attend, 20)]);
    } else if (d.type === "wish") {
      sheet_("Ucapan", ["Waktu", "Nama", "Ucapan"])
        .appendRow([new Date(), clean_(d.name, 80), clean_(d.message, 500)]);
    }
    return json_({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  const sh = sheet_("Ucapan", ["Waktu", "Nama", "Ucapan"]);
  const rows = sh.getDataRange().getValues().slice(1).reverse().slice(0, 200);
  const wishes = rows.map(r => ({
    time: r[0] instanceof Date ? r[0].toISOString() : r[0],
    name: String(r[1]).replace(/^'/, ""),
    message: String(r[2]).replace(/^'/, ""),
  }));
  return json_({ wishes });
}
