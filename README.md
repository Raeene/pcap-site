# PacketStory

Drop a `.pcap` or `.pcapng` file and get the story of what happened in plain language. It runs entirely in your browser: the capture is parsed by a Web Worker on your machine, and the page's Content-Security-Policy (`connect-src 'none'`) means the browser itself blocks any network request.

Live at **[pcap.0vuln.com](https://pcap.0vuln.com)**. Try it instantly: [pcap.0vuln.com/#demo](https://pcap.0vuln.com/#demo).

## What it does
- Parses classic pcap (µs and ns) and **pcapng** (multiple interfaces, per-interface timestamp resolution).
- Link layers: Ethernet (with VLAN tags), Linux cooked v1/v2, raw IP, BSD loopback. IPv4 and IPv6 (with extension headers); TCP, UDP, ICMP/ICMPv6, ARP; DNS and SNMP decoding.
- Builds a timestamped **story** of findings, each linked to its MITRE ATT&CK technique.
- Extracts **artifacts**: credentials (secrets are never shown, only their length), transferred files, HTTP requests, DNS names.
- Summaries: timeline with findings marked, protocols, top talkers, destination ports, conversations.
- A **packet table** with a filter (`ftp`, `ip:10.0.0.5`, `port:21`, `!arp`, free text). Click any talker, port or finding to filter.
- **Packet inspector**: click any packet to see every layer decoded (Ethernet, IPv4/IPv6, TCP/UDP/ICMP, ARP) with checksum verification, and a hex view that highlights the bytes of the field you hover.
- **Follow conversation**: rebuilds everything two endpoints said to each other, client and server colored.
- **Solve the case**: seven investigation questions on the demo capture, checked as you type (`case.js`).
- **TLS server names (SNI)** pulled from ClientHello messages, so encrypted HTTPS still shows which sites were contacted.
- **Network map** of the busiest hosts, and **CSV export** of the filtered packets.
- Saves a standalone HTML report.
- Receives sessions straight from [0vuln Range](https://range.0vuln.com) (the `analyze` command) through `postMessage`, with the sender's origin checked.

## Detectors
| Finding | Heuristic | ATT&CK |
|---|---|---|
| Port scan | One host sends SYNs to 20+ ports on one target | T1046 |
| Host sweep | One host probes the same port on 10+ hosts | T1046 |
| Ping sweep | One host sends ICMP echo to 10+ hosts | T1018 |
| Cleartext credentials | FTP, POP3, IMAP logins and HTTP Basic auth seen unencrypted | T1552 |
| Telnet session | Any Telnet payload | T1552 |
| Brute force | 5+ failed FTP/IMAP logins, or 10+ connections to an auth service (SSH, RDP, SMB...) | T1110 |
| Vulnerability scanner | HTTP User-Agent of sqlmap, nikto, nmap, gobuster, ffuf... | T1595.002 |
| Directory brute force | 20+ HTTP 404s to one client | T1595.003 |
| DNS zone transfer | AXFR query | T1590.002 |
| DNS tunneling | 10+ queries with very long names or labels | T1071.004 |
| SNMP default community | Requests using `public` / `private` | T1602.001 |
| ARP spoofing | One IP claimed by 2+ MAC addresses | T1557.002 |
| Beaconing | 8+ connections to one destination at near-constant intervals | T1071 |

These are heuristics, so findings say "suspected". Only the first 512 bytes of each payload are inspected, and TCP streams are not reassembled.

## Files
- `index.html`, `app.css`, `app.js`: the UI (no inline scripts or styles, so the CSP can stay strict)
- `inspect.js`: the packet inspector and follow-conversation view
- `ds.css`, `ds.js`, `fonts/`: the shared 0vuln design system (built from the private `0vuln-design` repo)
- `core.js`: parser and detectors; runs as a Web Worker and can also be `require()`d from Node for tests
- `_headers`: security headers for Cloudflare

## Deploy
Static site. Cloudflare Pages: no build command, output directory `/`.

Only analyze captures you made yourself or public sample captures (for example the Wireshark sample captures).

## Roadmap
- JA3 fingerprints and SMB detectors
- Per-host drill-down view

## License
MIT
