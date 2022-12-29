import { verifyLicenseKey } from "@/appValidation"

describe("Electron main", () => {
    it ("calls validation url", () => {
        verifyLicenseKey("15249-811B1-2C828-B29E8");
    })
})