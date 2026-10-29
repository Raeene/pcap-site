# PacketStory

Drop a `.pcap` file, get the story of what happened in plain language. It runs entirely in your browser: nothing is uploaded, and the page makes no network requests.

![demo](demo.gif)

## What it does
- Parses classic `.pcap` captures (Ethernet, Linux cooked, raw IP; IPv4 and IPv6; TCP, UDP, ICMP, ARP).
- Summarizes protocols, top talkers, top destination ports, and a traffic timeline.
- Runs detectors and turns the findings into a timestamped story, each tagged with a MITRE ATT&CK technique.
- Exports the result as a standalone HTML report.

## Detectors
| Finding | How it is detected | ATT&CK |
|---|---|---|
| Port scan | One host sends SYN packets to 20+ ports on one target | T1046 |
| Cleartext credentials | FTP USER/PASS and HTTP Basic auth seen unencrypted (passwords are never shown, only their length) | T1552 |
| Brute force | 5+ FTP "530 Login incorrect" replies to one client | T1110 |
| DNS tunneling | 10+ DNS queries with names of 50+ characters from one host | T1071.004 |
| ARP spoofing | One IP claimed by 2+ MAC addresses | T1557.002 |
| Beaconing | 8+ connections to one destination at near-constant intervals | T1071 |

These are heuristics, so results say "suspected". Only the first 300 bytes of each payload are inspected, and TCP streams are not reassembled.

## Privacy
All parsing happens locally in a Web Worker. The optional `_headers` file adds a Content-Security-Policy with `connect-src 'none'`, so the browser itself blocks any network request from the page.

## Use it
Open `index.html` locally, or deploy the folder to any static host (Cloudflare Pages: no build command, output directory `/`). Click "load the demo capture" to try it without a file.

Only analyze captures you made yourself or public sample captures (for example the Wireshark sample captures).

## Roadmap
- `.pcapng` support
- TCP stream reassembly
- More detectors (SMB, TLS anomalies)
- IPv6 extension headers

## License
MIT
