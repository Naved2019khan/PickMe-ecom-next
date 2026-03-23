/* ─── India Post Pincode Lookup ─── */

export interface PincodeResult {
  city:  string;
  state: string;
}

/**
 * Look up city & state by a 6-digit Indian pincode using the
 * free India Post API. Returns null on failure / invalid pin.
 */
export async function lookupPincode(pin: string): Promise<PincodeResult | null> {
  if (!/^\d{6}$/.test(pin)) return null;

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    if (!res.ok) return null;

    const data = await res.json();

    // API returns an array with one entry
    const entry = data?.[0];
    if (entry?.Status !== "Success" || !entry?.PostOffice?.length) return null;

    const po = entry.PostOffice[0];
    return {
      city:  po.District  || po.Division || po.Name || "",
      state: po.State     || "",
    };
  } catch {
    return null;
  }
}
