# PHY-T1004: Exposed Physical Network Interface Assessment

**Tactic:** PHY-TAC-05 (Physical Interface & Hardware Layer Protection)  
**Target Object:** PORT  
**Status:** Base Assessment Coverage  

## Assessment Hypothesis
Publicly accessible network jacks that maintain an active physical link may provide unauthorized network connectivity if administrative port shutdown, 802.1X, or MAC-based quarantine is misconfigured.

## Observable Condition
The assessor establishes whether a publicly accessible RJ-45 Ethernet wall jack in an unmonitored common area exhibits an active physical Layer 1 carrier signal upon passive connection.

## Inspection Procedure (10 Seconds)
1. Insert a passive zero-packet LED link tester into the wall drop.
2. Observe indicator LEDs for Layer 1 electrical signal carrier.
3. Check whether the drop is labeled and administratively documented.

## Result Model
- **Hardened:** Zero link pulse (port administratively shut down or unpatched) or documented 802.1X policy confirmed enforced.
- **Deficient:** Active Layer 1 link continuous on unmonitored common-area drop with verified absence of 802.1X or administrative shutdown policy.
- **Condition Requires Validation:** Active Layer 1 link carrier observed on unmonitored drop; network access control (802.1X), VLAN isolation, and MAC quarantine status require administrative verification.

## Limitations
- **Can Establish:** Physical Layer 1 carrier signaling and administrative port shutdown state.
- **Cannot Establish:** IEEE 802.1X network access control enforcement, VLAN placement, or IP-layer reachability without authorized active testing.
