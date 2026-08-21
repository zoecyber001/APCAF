# PHY-T1001: Credential Technology Assessment

**Tactic:** PHY-TAC-02 (Credential & Identity Protection)  
**Target Object:** BADGE  
**Status:** Base Assessment Coverage  

## Assessment Hypothesis
Static, unauthenticated credential identifiers may permit credential replay or cloning where the access-control architecture does not provide cryptographic mutual authentication.

## Observable Condition
The assessor establishes whether the credential operates on an unencrypted carrier (such as 125 kHz Low Frequency Prox) or broadcasts a static Card Serial Number (CSN) without cryptographic challenge-response validation.

## Inspection Procedure (5 Seconds)
1. Present authorized credential to a pocket multi-frequency RFID analyzer.
2. Read carrier frequency:
   - **125 kHz:** Low-frequency proximity carrier (unencrypted).
   - **13.56 MHz:** High-frequency smartcard carrier.
3. Check communication protocol for mutual challenge-response encryption (ISO/IEC 14443-4).

## Result Model
- **Hardened:** Mutual cryptographic authentication (AES-128 / DESFire EV2/EV3 / Seos / PIV).
- **Deficient:** Unencrypted static UID broadcast (125 kHz Prox / MIFARE Classic static CSN).
- **Condition Requires Validation:** High-frequency credential present, but reader SAM encryption activation requires administrative audit.

## Limitations
- **Can Establish:** Carrier frequency and exposure of static unencrypted identifiers.
- **Cannot Establish:** Local attacker tool availability or reader-side secondary multi-factor policies.
