import "websocket-polyfill";
import NDK, { NDKKind } from "@nostr-dev-kit/ndk";

const MOSTRO_PUBKEY = "npub1ykvsmrmw2hk7jgxgy64zr8tfkx4nnjhq9eyfxdlg3caha3ph0skq6jr3z0";
type ExtendedNDKKind = NDKKind | 38383
const NOSTR_REPLACEABLE_EVENT_KIND: ExtendedNDKKind = 38383

const filters = {
    kinds: [NOSTR_REPLACEABLE_EVENT_KIND as NDKKind],
    authors: [MOSTRO_PUBKEY]
};

const ndk = new NDK({
    explicitRelayUrls: [
        "wss://nostr.bilthon.dev",
        "wss://nostr.wine",
        "wss://btc.klendazu.com",
        "wss://relay.damus.io",
        "wss://nos.lol",
        "wss://nostr-pub.wellorder.net",
    ],
    enableOutboxModel: false,
});

await ndk.connect(6000);

// const eventsPerRelay = new Map<string, number>();
// const eventIds = new Set();

const sub = await ndk.fetchEvent("cca467dc3cf923bed6bcbe8d2874f60b523d3eaf039d917fffa0584393330d26");
console.log(sub?.rawEvent());


const a = await ndk.subscribe(filters);

a.on("event", (event) => console.log(`received event on a`, event.id, event.content));
a.on("eose", () => console.log(`received eose on a`));

// setTimeout(async () => {
//     const b = await ndk.subscribe(
//         {kinds:[1], authors:["8f3cb4b03090cb9a0bf8a8519d4a653c4f436179eeb3c824026c47ad85bff669"]},
//         { closeOnEose: false }
//     );

//     b.on("event", (event) => console.log(`received event on b`, event.id, event.content));
// }, 500);

// setTimeout(async () => {

// const first = await ndk.subscribe({
//     kinds: [0], authors: ["fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52"],
// }, { groupable: true, groupableDelay: 5000 });
// const second = await ndk.subscribe({
//     kinds: [0], authors: ["3ef7277dc0870c8c07df0ee66829928301eb95785715a14f032aca534862bae0"],
// }, { groupable: true, groupableDelay: 5000 });
// setTimeout(() => {
//     ndk.subscribe({
//         kinds: [0], authors: ["2d5b6404df532de082d9e77f7f4257a6f43fb79bb9de8dd3ac7df5e6d4b500b0"],
//     }, { groupable: true, groupableDelay: 100 });
// }, 100);

// first.on("event", (e) => console.log(`first`, e.id));
// second.on("event", (e) => console.log(`second`, e.id));

// }, 1);

// const pablo = ndk.getUser({npub: "npub1l2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqutajft"});
// ndk.subscribe({
//     kinds: [1], authors: [ pablo.hexpubkey ], limit: 1
// }, { closeOnEose: true }).on("event", (e) => {
//     console.log(`got event ${e.id} from ${e.relay?.url}`);
// });

// setTimeout(() => {
//     ndk.subscribe({
//         kinds: [1], authors: [ pablo.hexpubkey ], limit: 20
//     }, { closeOnEose: false }).on("event", (e) => {
//         console.log(`got event ${e.id} from ${e.relay?.url}`);
//     });
// }, 5000);

// const follows = await pablo.follows({ groupable: false }, false);

// console.log(`fetched ${follows.size} follows`);

// const user = ndk.getUser({npub: "npub1nf9vm6uhs4j7yaysmjn9eqlf7et5t6hvrkdqgpd995vcc9yfjyas0pxa3x"});

//     const notes1 = ndk.subscribe({
//         kinds:[1], authors:[
//             "fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52",
//         ]
//     }, { closeOnEose: false, groupable: true, groupableDelay: 100 });

//     const notes2 = ndk.subscribe({
//         kinds:[1], authors:[
//             "3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d",
//         ]
//     }, { closeOnEose: false, groupable: true, groupableDelay: 100 });

//     const notes3 = ndk.subscribe({
//         kinds:[1], authors:[
//             "356875ffd729b06eeb4c1d7a70a1f750045d067774d21c0faffe4af2bf96a2e8",
//         ]
//     }, { closeOnEose: false, groupable: true, groupableDelay: 2000 });

//     setTimeout(() => notes1.stop(), 1000);

//     notes1.on("event", (e) => {
//         console.log("Note 1", e.id, "from relay", e.relay?.url);
//     });

//     setTimeout(() => {
//         notes1.stop();
//     }, 1000);

//     setTimeout(() => {
//         notes2.stop();
//     }, 2000);

//     setTimeout(() => {
//         notes3.stop();
//     }, 3000);

// setTimeout(() => {
//     console.log(`going to ask for user`);
//     const notes = ndk.subscribe({
//         kinds:[1], authors:[
//             "356875ffd729b06eeb4c1d7a70a1f750045d067774d21c0faffe4af2bf96a2e8",
//         ], limit: 10
//     }, { closeOnEose: false });

//     notes.on("event", (e) => {
//         console.log("Note 2", e.id, "from relay", e.relay?.url);
//     });
// }, 5000);

// await ndk.fetchEvent({
//     kinds:[0], authors:[
//         "fa984bd7dbb282f07e16e7ae87b26a2a7b9b90b7246a44771f0cf5ae58018f52",
//         mike.hexpubkey
//     ]
// });
