// Import \\

import { Test } from "./test";


// Scripting \\

(async () => {
    const test = new Test()
    await test.load()
    await new Promise<void>(resolve => setTimeout(resolve, 3000))
    test.moveToMiddle()
    console.log("Done")
})();