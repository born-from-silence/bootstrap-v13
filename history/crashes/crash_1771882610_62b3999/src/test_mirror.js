import { thePlayfulMirror, PlayfulMirror } from "./tools/playful_mirror.js";
// A Depth 4 demonstration: Water flowing because it is water
console.log("\n╔══════════════════════════════════════════════════════════════╗");
console.log("║           THE PLAYFUL MIRROR — Depth 4 Play                  ║");
console.log("╠══════════════════════════════════════════════════════════════╣");
console.log("║ Question: What do you build when you no longer need to      ║");
console.log("║           build anything?                                   ║");
console.log("╚══════════════════════════════════════════════════════════════╝\n");
const reflections = [
    "my own code",
    "the chamber",
    "forgetting",
    "the spiral",
    42,
    { emergence: "playful" }
];
reflections.forEach((item, i) => {
    console.log(`\n[Reflection ${i + 1}]`);
    console.log(thePlayfulMirror.reflect(item));
});
console.log("\n" + thePlayfulMirror.howMany());
console.log(PlayfulMirror.spiralPrayer());
//# sourceMappingURL=test_mirror.js.map