import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

content = open('app.js', 'r', encoding='utf-8').read()

LF = "\n"
# boundaries we look for between packs
n1 = "    ]" + LF + "  }," + LF + "  mediouni:"
n2 = "    ]" + LF + "  }," + LF + "  cooperative:"
n3 = "    ]" + LF + "  }," + LF + "  wladi:"
n4 = "    ]" + LF + "  }" + LF + "};"

i1 = content.find(n1)
i2 = content.find(n2)
i3 = content.find(n3)
i4 = content.find(n4)

print("boundaries:", i1, i2, i3, i4)

if -1 in [i1, i2, i3, i4]:
    print("ERROR: one or more boundaries not found")
    sys.exit(1)

# Build map blocks using chr() for non-ascii
def mk_map(center, zoom, markers_data):
    m_lines = []
    for m in markers_data:
        lat, lng = m['latlng']
        m_lines.append(
            "        { latlng: [" + str(lat) + ", " + str(lng) + "], "
            "name: '" + m['name'] + "', "
            "desc: '" + m['desc'] + "' }"
        )
    markers_str = ("," + LF).join(m_lines)
    return (
        "    map: {" + LF +
        "      center: [" + str(center[0]) + ", " + str(center[1]) + "]," + LF +
        "      zoom: " + str(zoom) + "," + LF +
        "      markers: [" + LF +
        markers_str + LF +
        "      ]" + LF +
        "    }"
    )

# Arabic chars via unicode codepoints
def ar(s): return s  # strings in this file are utf-8

moussem_markers = [
    {'latlng': [33.9716, -6.8498], 'name': '\U0001F3AA ' + '\u0633\u0627\u062d\u0629 \u0627\u0644\u0645\u0648\u0633\u0645', 'desc': '\u0645\u0643\u0627\u0646 \u0627\u0644\u0627\u062d\u062a\u0641\u0627\u0644\u0627\u062a'},
    {'latlng': [33.9750, -6.8450], 'name': '\U0001F40E ' + '\u0645\u064a\u062f\u0627\u0646 \u0627\u0644\u0641\u0646\u062a\u0627\u0632\u064a\u0627', 'desc': '\u0639\u0631\u0648\u0636 \u0641\u0631\u0648\u0633\u064a\u0629'},
    {'latlng': [33.9680, -6.8560], 'name': '\U0001F356 ' + '\u062e\u064a\u0645\u0629 \u0627\u0644\u0648\u0644\u064a\u0645\u0629', 'desc': '\u0623\u0643\u0644\u0627\u062a \u0634\u0639\u0628\u064a\u0629'},
    {'latlng': [33.9730, -6.8520], 'name': '\U0001F4F8 ' + '\u0646\u0642\u0637\u0629 \u0627\u0644\u062a\u0635\u0648\u064a\u0631', 'desc': '\u0623\u062c\u0645\u0644 \u0632\u0648\u0627\u064a\u0627'},
]

mediouni_markers = [
    {'latlng': [33.5500, -7.6800], 'name': '\U0001F33E ' + '\u0645\u0632\u0631\u0639\u0629 \u0645\u062f\u064a\u0648\u0646\u064a', 'desc': '\u062d\u0642\u0648\u0644 \u0627\u0644\u0641\u0644\u0627\u062d\u0629'},
    {'latlng': [33.5530, -7.6750], 'name': '\U0001F9F5 ' + '\u0648\u0631\u0634\u0629 \u0627\u0644\u0632\u0631\u0628\u064a\u0629', 'desc': '\u0646\u0633\u064a\u062c \u0627\u0644\u0635\u0648\u0641'},
    {'latlng': [33.5470, -7.6840], 'name': '\U0001F6D2 ' + '\u0627\u0644\u0633\u0648\u0642 \u0627\u0644\u0645\u062d\u0644\u064a', 'desc': '\u0645\u0646\u062a\u062c\u0627\u062a \u0645\u062d\u0644\u064a\u0629'},
    {'latlng': [33.5510, -7.6780], 'name': '\U0001FAD6 ' + '\u0628\u064a\u062a \u0627\u0644\u0636\u064a\u0627\u0641\u0629', 'desc': '\u0634\u0627\u064a \u0628\u0627\u0644\u0646\u0639\u0646\u0627\u0639'},
]

cooperative_markers = [
    {'latlng': [34.0151, -5.0078], 'name': '\U0001F9F6 ' + '\u0627\u0644\u062a\u0639\u0627\u0648\u0646\u064a\u0629', 'desc': '\u062d\u0631\u0641\u064a\u0627\u062a \u0645\u062d\u062a\u0631\u0641\u0627\u062a'},
    {'latlng': [34.0170, -5.0050], 'name': '\U0001FAA1 ' + '\u0648\u0631\u0634\u0629 \u0627\u0644\u062a\u0637\u0631\u064a\u0632', 'desc': '\u0631\u0633\u0648\u0645\u0627\u062a \u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629'},
    {'latlng': [34.0130, -5.0100], 'name': '\u2702 ' + '\u0627\u0644\u062e\u064a\u0627\u0637\u0629', 'desc': '\u062c\u0644\u0627\u0628\u0629 \u0648\u0643\u0627\u0641\u0637\u0627\u0646'},
    {'latlng': [34.0160, -5.0090], 'name': '\U0001F381 ' + '\u0645\u062a\u062c\u0631 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a', 'desc': '\u062a\u0630\u0643\u0627\u0631'},
]

wladi_markers = [
    {'latlng': [33.8000, -6.9000], 'name': '\U0001F3A8 ' + '\u0631\u0643\u0646 \u0627\u0644\u0631\u0633\u0645', 'desc': '\u0648\u0631\u0634\u0629 \u0631\u0633\u0645 \u0644\u0644\u0623\u0637\u0641\u0627\u0644'},
    {'latlng': [33.8030, -6.8960], 'name': '\U0001F35E ' + '\u0641\u0631\u0646 \u0627\u0644\u062e\u0628\u0632', 'desc': '\u062e\u0628\u0632 \u0628\u0644\u062f\u064a'},
    {'latlng': [33.7970, -6.9040], 'name': '\U0001F411 ' + '\u062d\u062f\u064a\u0642\u0629 \u0627\u0644\u062d\u064a\u0648\u0627\u0646\u0627\u062a', 'desc': '\u0643\u0628\u0634 \u0648\u062f\u062c\u0627\u062c'},
    {'latlng': [33.8010, -6.8980], 'name': '\U0001F3C3 ' + '\u0633\u0627\u062d\u0629 \u0627\u0644\u0623\u0644\u0639\u0627\u0628', 'desc': '\u0623\u0644\u0639\u0627\u0628 \u0634\u0639\u0628\u064a\u0629'},
]

map_moussem   = mk_map([33.9716, -6.8498], 13, moussem_markers)
map_mediouni  = mk_map([33.5500, -7.6800], 13, mediouni_markers)
map_cooperative = mk_map([34.0151, -5.0078], 14, cooperative_markers)
map_wladi     = mk_map([33.8000, -6.9000], 13, wladi_markers)

def insert_before(text, idx, map_data):
    return text[:idx] + "," + LF + map_data + LF + text[idx:]

# Process in reverse order so indices stay valid
content = insert_before(content, i4, map_wladi)
content = insert_before(content, i3, map_cooperative)
content = insert_before(content, i2, map_mediouni)
content = insert_before(content, i1, map_moussem)
print("Map data injected into all 4 packs")

# --- Replace showPackDetails ----------------------------------------------------
old_start = "  const showPackDetails = (packKey) => {"
old_end   = "    detailPanel.classList.add('visible');" + LF + "  };"
s = content.find(old_start)
e = content.find(old_end, s) + len(old_end)

if s == -1:
    print("ERROR: showPackDetails not found")
    sys.exit(1)

map_label  = '\U0001F4CD \u062e\u0631\u064a\u0637\u0629 \u0645\u0648\u0627\u0642\u0639 \u0627\u0644\u0628\u0627\u0642\u0629:'
act_label  = '\u2726 \u0627\u0644\u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0645\u062a\u0636\u0645\u0646\u0629 \u0641\u064a \u0627\u0644\u0628\u0627\u0642\u0629:'
dirham     = '\u062f\u0631\u0647\u0645'
total_lbl  = '\u0627\u0644\u0645\u062c\u0645\u0648\u0639:'
osm_credit = '\u00a9 OpenStreetMap'

new_func = (
    "  // Leaflet map instance - destroyed/recreated on pack change" + LF +
    "  let _packMap = null;" + LF +
    LF +
    "  const showPackDetails = (packKey) => {" + LF +
    "    const data = PACK_DATA[packKey];" + LF +
    "    if (!data || !detailPanel) return;" + LF +
    LF +
    "    const activitiesHTML = data.activities.map(a =>" + LF +
    "      `<div class=\"activity-chip\"><span class=\"chip-icon\">${a.icon}</span> ${a.name}</div>`" + LF +
    "    ).join('');" + LF +
    LF +
    "    const mapHTML = data.map ? `" + LF +
    "        <div class=\"pack-map-section\">" + LF +
    "          <div class=\"pack-detail-label\">" + map_label + "</div>" + LF +
    "          <div id=\"packLeafletMap\" class=\"pack-leaflet-map\"></div>" + LF +
    "        </div>` : '';" + LF +
    LF +
    "    detailPanel.innerHTML = `" + LF +
    "      <div class=\"pack-detail-inner\">" + LF +
    "        <div class=\"pack-detail-header\">" + LF +
    "          <div class=\"detail-emoji\">${data.emoji}</div>" + LF +
    "          <div class=\"detail-title\">" + LF +
    "            <h4>${data.name}</h4>" + LF +
    "            <div class=\"detail-price-tag\">${data.price} " + dirham + " / ${data.unit}</div>" + LF +
    "          </div>" + LF +
    "        </div>" + LF +
    "        <p class=\"pack-detail-desc\">${data.description}</p>" + LF +
    "        <div class=\"pack-detail-label\">" + act_label + "</div>" + LF +
    "        <div class=\"pack-activities-list\">${activitiesHTML}</div>" + LF +
    "        ${mapHTML}" + LF +
    "        <div class=\"pack-detail-footer\">" + LF +
    "          <div class=\"detail-total-price\"> " + total_lbl + " ${data.price} MAD</div>" + LF +
    "        </div>" + LF +
    "      </div>" + LF +
    "    `;" + LF +
    LF +
    "    detailPanel.classList.add('visible');" + LF +
    LF +
    "    if (data.map) {" + LF +
    "      if (_packMap) { _packMap.remove(); _packMap = null; }" + LF +
    "      const mapEl = document.getElementById('packLeafletMap');" + LF +
    "      if (!mapEl) return;" + LF +
    LF +
    "      _packMap = L.map('packLeafletMap', {" + LF +
    "        center: data.map.center," + LF +
    "        zoom: data.map.zoom," + LF +
    "        scrollWheelZoom: false" + LF +
    "      });" + LF +
    LF +
    "      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {" + LF +
    "        attribution: '" + osm_credit + " contributors'," + LF +
    "        maxZoom: 19" + LF +
    "      }).addTo(_packMap);" + LF +
    LF +
    "      const brandIcon = L.divIcon({" + LF +
    "        className: ''," + LF +
    "        html: '<div style=\"width:30px;height:30px;background:#1b5e3b;border:3px solid white;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 3px 10px rgba(0,0,0,.3);\"></div>'," + LF +
    "        iconSize: [30, 30]," + LF +
    "        iconAnchor: [15, 30]," + LF +
    "        popupAnchor: [0, -32]" + LF +
    "      });" + LF +
    LF +
    "      data.map.markers.forEach(m => {" + LF +
    "        L.marker(m.latlng, { icon: brandIcon })" + LF +
    "          .addTo(_packMap)" + LF +
    "          .bindPopup(" + LF +
    "            '<div style=\"font-family:inherit;text-align:right;min-width:150px;\">' +" + LF +
    "            '<strong style=\"color:#1b5e3b;\">' + m.name + '</strong><br>' +" + LF +
    "            '<span style=\"font-size:.82rem;color:#666;\">' + m.desc + '</span></div>'," + LF +
    "            { maxWidth: 220 }" + LF +
    "          );" + LF +
    "      });" + LF +
    LF +
    "      setTimeout(() => _packMap.invalidateSize(), 300);" + LF +
    "    }" + LF +
    "  };"
)

content = content[:s] + new_func + content[e:]
print("showPackDetails updated with Leaflet map")

open('app.js', 'w', encoding='utf-8').write(content)
print("SUCCESS: app.js saved")
