const { log, LogLevel } = require("@peacockproject/core/loggingInterop")
const zlib = require("zlib")
const { Buffer } = require("buffer")
const randomUUID = require("crypto").randomUUID

function decompress(input) {
    return JSON.parse(
        zlib.brotliDecompressSync(Buffer.from(input, "base64")).toString()
    )
}
xorshift = (t) => {
    let e = t;
    return (e ^= e << 13), (e ^= e >> 17), (e ^= e << 5), e >>> 0;
  };
const getRandomIntWithSeed = (t, e, r) => {
    const n = xorshift(r),
      s = new MersenneTwister(n).random() / 4294967295;
    return Math.floor(s * (e - t + 1)) + t;
  }
  
  class MersenneTwister {
    constructor(t) {
      (this.N = 624),
        (this.mt = new Array(this.N)),
        (this.index = 0),
        (this.mt[0] = t >>> 0);
      for (let t = 1; t < this.N; t++)
        this.mt[t] =
          (1812433253 * (this.mt[t - 1] ^ (this.mt[t - 1] >>> 30)) + t) >>> 0;
    }
    random() {
      0 === this.index && this.generateNumbers();
      let t = this.mt[this.index];
      return (
        (t ^= t >>> 11),
        (t ^= (t << 7) & 2636928640),
        (t ^= (t << 15) & 4022730752),
        (t ^= t >>> 18),
        (this.index = (this.index + 1) % this.N),
        t >>> 0
      );
    }
    generateNumbers() {
      for (let t = 0; t < this.N; t++) {
        let e =
          (2147483648 & this.mt[t]) + (2147483647 & this.mt[(t + 1) % this.N]);
        (this.mt[t] = this.mt[(t + 397) % this.N] ^ (e >>> 1)),
          e % 2 != 0 && (this.mt[t] ^= 2567483615);
      }
    }
  }

module.exports = function ContractSearch(controller) {
    let seed = controller.transferseed
    controller.hooks.getSearchResults.tap("ContractSearchResults", async (parameters, ids) => {
        const contractId = randomUUID()
        controller.transfercontractid = contractId
        seed = controller.transferseed
        const defaultMissionPool = []
        const selectedMissionPool = []
        const rouletteFilters = []
        const defaultRouletteFilters = ["specificDisguises", "specificMelee", "specificFirearms", "specificAccidents"]
        let seedimagepath = controller.transferseedimagepath
        let seedtitle = controller.transferseedtitle
        let plaintextseedfordisplay = controller.transferdisplayseed
        let SeedGameChanger = {
            "270e1adc-06d2-4680-b7c7-53c2599074b5": {
              Name: seedtitle,
              Description: plaintextseedfordisplay,
              Icon: "images/Contracts/RandomRoulette/RR_LOGO.jpg",
              IsHidden: null,
              TileImage: seedimagepath,
              Resource: [],
              Objectives: [
                {
                  Id: "e8cc0242-a468-45c2-82de-1da88a4b5bc2",
                  Category: "primary",
                  OnActive: {
                    IfCompleted: {
                      Visible: false,
                    },
                  },
                  AllowEtRestartOnSuccess: true,
                  BriefingText:
                    "$loc UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_RECORDINGS_PRIMARY_OBJ",
                  HUDTemplate: {
                    display:
                      "$loc UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_RECORDINGS_PRIMARY_OBJ",
                  },
                  Type: "statemachine",
                  Definition: {
                    Scope: "session",
                    Context: {},
                    States: {
                      Start: {
                        "-": {
                          Transition: "Success",
                        },
                      },
                    },
                  },
                },
              ],
              ShowBasedOnObjectives: null,
              IsPrestigeObjective: null,
            },
          }
          controller.configManager.configs.GameChangerProperties = Object.assign(
            {},
            controller.configManager.configs.GameChangerProperties,
            SeedGameChanger
          );
        for (const param of parameters) {
            // Get the key and value of the search parameter
            const criterion = param.split(";")
            if (criterion[0] === "OwnedLocation"){
                defaultMissionPool.push(criterion[1])
            } else if (criterion[0] === "Location"){
                selectedMissionPool.push(criterion[1])
            } else if (criterion[0] === "RouletteFilter"){
                rouletteFilters.push(criterion[1])
            }
        }

        if (selectedMissionPool.length == 0){
            selectedMissionPool.push.apply(selectedMissionPool, defaultMissionPool)
        }

        if (rouletteFilters.length == 0){
            rouletteFilters.push.apply(rouletteFilters, defaultRouletteFilters)
        }

        log(LogLevel.INFO, "[Story Mode Roulette] Selected missions:" + selectedMissionPool)
        log(LogLevel.INFO, "[Story Mode Roulette] Selected filters:" + rouletteFilters)
        log(LogLevel.INFO, "[Story Mode Roulette] Seed is:" + seed)

        const selectedMission = selectedMissionPool[getRandomIntWithSeed( 0, selectedMissionPool.length-1, seed++)]

        const contractInfo = decompress("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")

        const info = contractInfo[selectedMission]

        const baseContract = {"Data":{"Objectives":[],"Bricks":[],"VR":[],"GameChangers":[]},"Metadata":{"CreatorUserId":"fadb923c-e6bb-4283-a537-eb4d1150262e","IsPublished":true,"TileImage":"roulettetitleimage","BriefingVideo":"roulettebriefing","DebriefingVideo":"roulettedebriefing","Location":"roulettelocation","Title":"roulettetitle","ScenePath":"roulettescenepath","Description":"roulettedescription","Id":"rouletteid","CreationTimestamp":"2000-01-01T00:00:00Z","LastUpdate":"2000-01-01T00:00:00Z","Type":"mission","Release":"1.0.x","Entitlements":["rouletteentitlements"],"PublicId":"696969696969"},"UserData":{}}
        baseContract.Data.GameChangers = ["270e1adc-06d2-4680-b7c7-53c2599074b5"]
        baseContract.Metadata.Location = info.RouletteLocation
        baseContract.Metadata.Title = info.RouletteTitle
        baseContract.Metadata.ScenePath = info.RouletteScenePath
        baseContract.Metadata.Description = info.RouletteDescription
        baseContract.Metadata.TileImage = info.RouletteTileImage
        baseContract.Metadata.BriefingVideo = info.RouletteBriefingVideo
        baseContract.Metadata.DebriefingVideo = info.RouletteDebriefingVideo
        baseContract.Metadata.Id = contractId
        baseContract.Metadata.Entitlements = info.RouletteEntitlements
        baseContract.Data.Bricks = info.RouletteBricks
        baseContract.Data.VR = info.RouletteVrBricks
        // still need to add difficulty bricks & entrances & briefing videos

        const killMethodPool = []
        const specificAccidents = ["accident_drown", "accident_explosion", "accident_push", "accident_suspended_object", "accident_electric", "accident_burn", "injected_poison", "consumed_poison", "remote_explosive", "impact_explosive", "loud_explosive"]
        const basic = ["assaultrifle", "shotgun", "sniperrifle"]
        const silenced = ["silenced_assaultrifle", "silenced_shotgun", "silenced_sniperrifle"]
        const loud = ["loud_assaultrifle", "loud_shotgun", "loud_sniperrifle"]

        if (rouletteFilters.includes("specificAccidents", 0)){
            killMethodPool.push.apply(killMethodPool, specificAccidents)
        }

        if ((rouletteFilters.includes("specificFirearms", 0) && (selectedMission != ("LOCATION_ICA_FACILITY_SHIP" || "LOCATION_ICA_FACILITY")))){
            killMethodPool.push("pistol")
            killMethodPool.push("loud_pistol")
            killMethodPool.push("silenced_pistol")
            killMethodPool.push("smg")
            killMethodPool.push("loud_smg")
            killMethodPool.push("silenced_smg")
            killMethodPool.push.apply(killMethodPool, basic)
            killMethodPool.push.apply(killMethodPool, silenced)
            killMethodPool.push.apply(killMethodPool, loud)
        }

        if ((rouletteFilters.includes("specificFirearms", 0) && (selectedMission == "LOCATION_ICA_FACILITY"))){
            killMethodPool.push("pistol")
            killMethodPool.push("loud_pistol")
            killMethodPool.push("silenced_pistol")
            killMethodPool.push("assaultrifle")
            killMethodPool.push("loud_assaultrifle")
        }

        if ((rouletteFilters.includes("specificFirearms", 0) && (selectedMission == "LOCATION_ICA_FACILITY_SHIP"))){
            killMethodPool.push("pistol")
            killMethodPool.push("loud_pistol")
            killMethodPool.push("silenced_pistol")
            killMethodPool.push("assaultrifle")
            killMethodPool.push("loud_assaultrifle")
            killMethodPool.push("shotgun")
            killMethodPool.push("loud_shotgun")
        }

        if ((rouletteFilters.includes("specificMelee", 0)) && (info.RouletteMeleeWeapons != [""])){
            killMethodPool.push.apply(killMethodPool, info.RouletteMeleeWeapons)
            killMethodPool.push("fiberwire")
            killMethodPool.push("unarmed")
            log(LogLevel.INFO, killMethodPool)
        }

        if (rouletteFilters.includes("rrBannedKills")){
            killMethodPool.push("pistol_elimination")
            killMethodPool.push("weapon_elimination")
        }

        if ((rouletteFilters.includes("rrBannedKills")) && (selectedMission != ("LOCATION_ICA_FACILITY_SHIP" || "LOCATION_ICA_FACILITY"))){
            killMethodPool.push("smg_elimination")
        }

        const disguisePool = info.RouletteDisguises

        // The following section randomizes kill methods and disguises

        const selectedKillMethodList = []
        const selectedDisguiseList = []

        if (rouletteFilters.includes("rrBannedKills")){
            for (let a = 0; a <= info.RouletteTargetNumber; a++){
                const selectedKillMethod = killMethodPool[getRandomIntWithSeed( 0, killMethodPool.length-1, seed++)]
                const selectedDisguise = disguisePool[getRandomIntWithSeed( 0, disguisePool.length-1, seed++)]
                selectedKillMethodList.push(selectedKillMethod)
                selectedDisguiseList.push(selectedDisguise)
            }
        } else {
            let bannedConditions = true
            while (bannedConditions){
                selectedKillMethodList.length = 0
                selectedDisguiseList.length = 0

                for (let a = 0; a <= info.RouletteTargetNumber; a++){
                    const selectedKillMethod = killMethodPool[getRandomIntWithSeed( 0, killMethodPool.length-1, seed++)]
                    const selectedDisguise = disguisePool[getRandomIntWithSeed( 0, disguisePool.length-1, seed++)]
                    selectedKillMethodList.push(selectedKillMethod)
                    selectedDisguiseList.push(selectedDisguise)
                }

                function notMultipleLargeFirearms(array){
                    const largeFirearms = ["loud_smg", "assaultrifle", "loud_assaultrifle", "silenced_assaultrifle", "shotgun", "loud_shotgun", "silenced_shotgun", "sniperrifle", "loud_sniperrifle", "silenced_sniperrifle"]
                    let largeFirearmCount = 0

                    for (let i = 0; i < array.length; i++){
                        const testedKillMethod = array[i]
                        if (largeFirearms.includes(testedKillMethod)){
                            largeFirearmCount++
                            if (largeFirearmCount > 1){
                                return false
                            }
                        }
                    }
                    return true
                }

                let otherBannedConditions

                    if ((["LOCATION_PARIS", "LOCATION_COASTALTOWN", "LOCATION_BANGKOK", "LOCATION_HOKKAIDO", "LOCATION_MUMBAI", "LOCATION_NORTHAMERICA", "LOCATION_GREEDY_RACCOON", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_ANCESTRAL_BULLDOG", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[0] == "accident_burn")) || (["LOCATION_PARIS", "LOCATION_COASTALTOWN", "LOCATION_BANGKOK", "LOCATION_COLORADO", "LOCATION_MIAMI", "LOCATION_NORTHAMERICA", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "accident_burn")) || (["LOCATION_MUMBAI", "LOCATION_OPULENT_STINGRAY"].includes(selectedMission) && (selectedKillMethodList[2] == "accident_burn")) || (["LOCATION_COASTALTOWN", "LOCATION_COLORADO", "LOCATION_COLOMBIA", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA",].includes(selectedMission) && (selectedKillMethodList[0] == "consumed_poison")) || (["LOCATION_MUMBAI", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "consumed_poison")) || (["LOCATION_COLORADO", "LOCATION_MUMBAI"].includes(selectedMission) && (selectedKillMethodList[2] == "consumed_poison")) || (["LOCATION_COLORADO", "LOCATION_MUMBAI"].includes(selectedMission) && selectedKillMethodList.includes("accident_drown") || ((selectedMission == "LOCATION_MARRAKECH") && (selectedKillMethodList[1] == "accident_drown")) || ((selectedDisguiseList[1] == "c4146f27-81a9-42ef-b3c7-87a9d60b87fe") && (selectedKillMethodList[1] == "accident_drown")) || (["LOCATION_MARRAKECH", "LOCATION_NORTHAMERICA"].includes(selectedMission) && (selectedKillMethodList[0] == "accident_suspended_object")) || (["LOCATION_COLOMBIA", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "accident_suspended_object")) || ((selectedMission == "LOCATION_OPULENT_STINGRAY") && (selectedKillMethodList[2] == "accident_suspended_object")) || (["LOCATION_COLOMBIA", "LOCATION_NORTHSEA"].includes(selectedMission) && selectedKillMethodList.includes("b2321154-4520-4911-9d94-9256b85e0983")) || ((selectedMission == "LOCATION_NORTHAMERICA") && (["58dceb1c-d7db-41dc-9750-55e3ab87fdf0", "b153112f-9cd1-4a49-a9c6-ba1a34f443ab"].includes(selectedKillMethodList[0]) || (["58dceb1c-d7db-41dc-9750-55e3ab87fdf0", "b153112f-9cd1-4a49-a9c6-ba1a34f443ab"].includes(selectedKillMethodList[1]))) || ((selectedMission == "LOCATION_MARRAKECH") && (selectedKillMethodList[1] == "accident_electric")) || ((selectedMission == "LOCATION_COLORADO") && (selectedKillMethodList[2] == "accident_electric")))))
                    {
                        otherBannedConditions = true
                    }
                    else {
                        otherBannedConditions = false
                    }

                    log(LogLevel.INFO, "[Story Mode Roulette] Other banned conditions: " + otherBannedConditions)


                if (notMultipleLargeFirearms(selectedKillMethodList) && (otherBannedConditions == false)){
                    bannedConditions = false
                }

            }
        }

        log(LogLevel.INFO, "[Story Mode Roulette] Selected killmethods: " + selectedKillMethodList)
        log(LogLevel.INFO, "[Story Mode Roulette] Selected disguises: " + selectedDisguiseList)

        // The following section generates objectives based on the randomized conditions

        const berlinVerificationObjective = {"Id":"ece1b420-cbd4-442c-9a5d-0cc2caf6f2d7","Category":"primary","ObjectiveType":"setpiece","Image":"images/actors/mongoose_unknown_man.png","BriefingName":"Verify first 5 agent kills","BriefingText":"You eliminated an ICA Agent with a kill method / disguise combo that did not match the specified conditions.","LongBriefingText":"Eliminate 5 ICA Agents via the specified conditions","HUDTemplate":{"display":"Verify first 5 agent kills"},"Type":"statemachine","ForceShowOnLoadingScreen":false,"ExcludeFromScoring":true,"IsHidden":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Context":{"KilledTargets":0,"Targets":["252428ca-3f8e-4477-b2b9-58f18cff3e44"],"PossibleTargets":["252428ca-3f8e-4477-b2b9-58f18cff3e44","abd1c0e7-e406-43bd-9185-419029c5bf3d","922deccd-7fb4-45d9-ae3d-2cf11915c403","b8e7e65b-587e-471b-894d-282cda6614d4","2ab07903-e958-4af6-b01c-b62058745ce1","28cb7e91-bf9c-46ee-a371-1bd1448f1994","633398ac-c4b4-4441-852d-ae6460172025","eb024a5e-9580-49dc-a519-bb92c886f3b1","1305c2e4-6394-4cfa-b873-22adbd0c9702","f83376a4-6e56-4f2a-8122-151b272108fd","8b29da09-461f-44d7-9042-d4fde829b9f2"]},"States":{"Start":{"Kill":[{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$inc":"KilledTargets"}},{"Condition":{"$and":[{"$inarray":{"in":"$.PossibleTargets","?":{"$eq":["$.#","$Value.RepositoryId"]}}}]},"Transition":"Failure"},{"Condition":{"$eq":["$.KilledTargets",5]},"Transition":"Success"},{"Transition":"Start"}]}}}}
        let berlinVerificationObjectiveCondition

        for (let e = 0; e <= info.RouletteTargetNumber; e++){
            const mainObjectiveId = randomUUID()
            const killMethodObjectiveId = randomUUID()
            const disguiseObjectiveId = randomUUID()

            let mainObjective

            if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7"){
                mainObjective = {"Category":"primary","Type":"statemachine","OnInactive":{"IfCompleted":{"State":"Completed","Visible":false}},"OnActive":{"IfCompleted":{"Visible":true}},"Definition":{"Scope":"hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"-":{"Actions":{"$pushunique":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"],"$remove":["Targets",info.RouletteTargetIds[e]]}},"SierraLeftCar":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Pre_Kill":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Kill":[{"Condition":{"$and":[{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]}]},"Transition":"Success"}]}}},"Id":mainObjectiveId,"HUDTemplate":{"display":"balls"},"BriefingText":"","LongBriefingText":"balls","TargetConditions":[]}
            }
            else if (info.RouletteTargetIds[e] == "ab48a89d-e8a7-4df4-ae72-f0fccaa65e7f"){
                mainObjective = {"Category":"primary","Type":"statemachine","OnInactive":{"IfCompleted":{"State":"Completed","Visible":false}},"OnActive":{"IfCompleted":{"Visible":true}},"Definition":{"Scope":"hit","Context":{"TargetEscaping":1,"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"Kill":[{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Success"}],"Target_Leaving":[{"Actions":{"$dec":"TargetEscaping"},"Transition":"TargetEscaping"}]},"TargetEscaping":{"Kill":[{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Success"}],"Target_Escape":{"Transition":"Failure"}}}},"Id":mainObjectiveId,"HUDTemplate":{"display":"balls"},"BriefingText":"balls","LongBriefingText":"balls","TargetConditions":[]}
            }
            else if (["ballsack", "cunt", "asshole", "borisjohnson", "vladimirputin"].includes(info.RouletteTargetIds[e])){
                mainObjective = {"Category":"primary","ObjectiveType":"setpiece","Type":"statemachine","Definition":{"ContextListeners":{"Failure":{"type":"custom","LongBriefingText":"balls"}},"Context":{"Targets":["252428ca-3f8e-4477-b2b9-58f18cff3e44"],"PossibleTargets":["252428ca-3f8e-4477-b2b9-58f18cff3e44","abd1c0e7-e406-43bd-9185-419029c5bf3d","922deccd-7fb4-45d9-ae3d-2cf11915c403","b8e7e65b-587e-471b-894d-282cda6614d4","2ab07903-e958-4af6-b01c-b62058745ce1","28cb7e91-bf9c-46ee-a371-1bd1448f1994","633398ac-c4b4-4441-852d-ae6460172025","eb024a5e-9580-49dc-a519-bb92c886f3b1","1305c2e4-6394-4cfa-b873-22adbd0c9702","f83376a4-6e56-4f2a-8122-151b272108fd","8b29da09-461f-44d7-9042-d4fde829b9f2"],"PacifiedTargets":[],"KilledTargets":0},"States":{"Start":{"Pacify":{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$pushunique":["PacifiedTargets","$Value.RepositoryId"]}},"Kill":[{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$inc":"KilledTargets"}},{"Condition":{"$and":[{"$inarray":{"in":"$.PossibleTargets","?":{"$eq":["$.#","$Value.RepositoryId"]}}}]},"Transition":"Success"}]},"Success":{"Kill":[{"Condition":{"$and":[{"$inarray":{"in":"$.PossibleTargets","?":{"$eq":["$.#","$Value.RepositoryId"]}}},{"$lt":["$.KilledTargets",6]}]},"Transition":"Failure"}]}}},"Id":mainObjectiveId,"Image":"images/actors/ica-agents.png","BriefingName":"balls","BriefingText":"balls","LongBriefingText":"balls","HUDTemplate":{"display":"balls"}}
            }
            else {
                mainObjective = {"Category":"primary","Type":"statemachine","OnInactive":{"IfCompleted":{"State":"Completed","Visible":false}},"OnActive":{"IfCompleted":{"Visible":true}},"Definition":{"Scope":"hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"Kill":[{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Success"}]}}},"Id":mainObjectiveId,"HUDTemplate":{"display":"balls"},"BriefingText":"balls","LongBriefingText":"balls","TargetConditions":[]}
            }

            let mainObjectiveKillMethodCondition

            if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e], 0)){
                mainObjectiveKillMethodCondition = {"Type":"weapon","RepositoryId":selectedKillMethodList[e],"HardCondition":true,"ObjectiveId":killMethodObjectiveId}
            }
            else {
                mainObjectiveKillMethodCondition = {"Type":"killmethod","KillMethod":selectedKillMethodList[e],"HardCondition":true,"ObjectiveId":killMethodObjectiveId}
            }

            if (selectedMission != "LOCATION_EDGY_FOX"){
                mainObjective.TargetConditions.push(mainObjectiveKillMethodCondition)
            }

            let killMethodObjectiveCondition

            let firearmBroad

            if ((selectedKillMethodList[e] == "silenced_assaultrifle") || (selectedKillMethodList[e] == "loud_assaultrifle")){
                firearmBroad = "assaultrifle"
            }
            else if ((selectedKillMethodList[e] == "silenced_shotgun") || (selectedKillMethodList[e] == "loud_shotgun")){
                firearmBroad = "shotgun"
            }
            else if ((selectedKillMethodList[e] == "silenced_sniperrifle") || (selectedKillMethodList[e] == "loud_sniperrifle")){
                firearmBroad = "sniperrifle"
            }

            if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e], 0)){
                killMethodObjectiveCondition = { "$eq": ["$Value.KillItemRepositoryId", selectedKillMethodList[e]]}
            }
            else if ((selectedKillMethodList[e] == "fiberwire") || (selectedKillMethodList[e] == "unarmed") || specificAccidents.includes(selectedKillMethodList[e], 0) || basic.includes(selectedKillMethodList[e], 0)){
                killMethodObjectiveCondition = {"$eq":["$Value.KillMethodBroad",selectedKillMethodList[e]]}
            }
            else if (selectedKillMethodList[e] == "pistol"){
                killMethodObjectiveCondition = {"$or":[{"$eq":["$Value.KillMethodBroad","pistol"]},{"$eq":["$Value.KillMethodBroad","close_combat_pistol_elimination"]}]}
            }
            else if (selectedKillMethodList[e] == "silenced_pistol"){
                killMethodObjectiveCondition = {"$and":[{"$eq":["$Value.WeaponSilenced",true]},{"$or":[{"$eq":["$Value.KillMethodBroad","pistol"]},{"$eq":["$Value.KillMethodBroad","close_combat_pistol_elimination"]}]}]}
            }
            else if (selectedKillMethodList[e] == "loud_pistol"){
                killMethodObjectiveCondition = {"$and":[{"$eq":["$Value.WeaponSilenced",false]},{"$or":[{"$eq":["$Value.KillMethodBroad","pistol"]},{"$eq":["$Value.KillMethodBroad","close_combat_pistol_elimination"]}]}]}
            }
            else if (selectedKillMethodList[e] == "smg"){
                killMethodObjectiveCondition = {"$or":[{"$eq":["$Value.KillMethodBroad","smg"]},{"$and":[{"$eq":["$Value.KillMethodBroad","melee_lethal"]},{"$eq":["$Value.KillItemCategory","smg"]}]}]}
            }
            else if (selectedKillMethodList[e] == "silenced_smg"){
                killMethodObjectiveCondition = {"$and":[{"$eq":["$Value.WeaponSilenced",true]},{"$or":[{"$eq":["$Value.KillMethodBroad","smg"]},{"$and":[{"$eq":["$Value.KillMethodBroad","melee_lethal"]},{"$eq":["$Value.KillItemCategory","smg"]}]}]}]}
            }
            else if (selectedKillMethodList[e] == "loud_smg"){
                killMethodObjectiveCondition = {"$and":[{"$eq":["$Value.WeaponSilenced",false]},{"$or":[{"$eq":["$Value.KillMethodBroad","smg"]},{"$and":[{"$eq":["$Value.KillMethodBroad","melee_lethal"]},{"$eq":["$Value.KillItemCategory","smg"]}]}]}]}
            }
            else if (silenced.includes(selectedKillMethodList[e], 0)){
                killMethodObjectiveCondition = {"$and":[{"$eq":["$Value.WeaponSilenced",true]},{"$eq":["$Value.KillMethodBroad",firearmBroad]}]}
            }
            else if (loud.includes(selectedKillMethodList[e], 0)){
                killMethodObjectiveCondition = {"$and":[{"$eq":["$Value.WeaponSilenced",false]},{"$eq":["$Value.KillMethodBroad",firearmBroad]}]}
            }
            else if (selectedKillMethodList[e] == "smg_elimination"){
                killMethodObjectiveCondition = {"$and":[{"$eq":["$Value.KillMethodBroad","melee_lethal"]},{"$eq":["$Value.KillItemCategory","smg"]}]}
            }
            else if (selectedKillMethodList[e] == "pistol_elimination"){
                killMethodObjectiveCondition = {"$eq":["$Value.KillMethodBroad","close_combat_pistol_elimination"]}
            }
            else if (selectedKillMethodList[e] == "weapon_elimination"){
                killMethodObjectiveCondition = {"$or":[{"$and":[{"$eq":["$Value.KillMethodBroad","melee_lethal"]},{"$eq":["$Value.KillItemCategory","smg"]}]},{"$eq":["$Value.KillMethodBroad","close_combat_pistol_elimination"]}]}
            }

            if (selectedMission == "LOCATION_EDGY_FOX"){
                mainObjective.Definition.States.Start.Kill[1].Condition.$and.push(killMethodObjectiveCondition)
                mainObjective.Definition.States.Success.Kill[0].Condition.$and.push(killMethodObjectiveCondition)
            }

            let killMethodObjective 

            if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7"){
                killMethodObjective = {"Type":"statemachine","Id":killMethodObjectiveId,"BriefingText":"balls","Category":"primary","Definition":{"Scope":"Hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"-":{"Actions":{"$pushunique":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"],"$remove":["Targets",info.RouletteTargetIds[e]]}},"SierraLeftCar":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Pre_Kill":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"SniperKillSierraCar":{"Actions":{"$inc":"SniperKillAchieved"}},"Kill":[{"Condition":{"$and":[{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},killMethodObjectiveCondition]},"Transition":"Success"},{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Failure"}]}}}}
            }
            else {killMethodObjective = {"Type":"statemachine","Id":killMethodObjectiveId,"BriefingText":"balls","Category":"primary","Definition":{"Scope":"Hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"Kill":[{"Condition":{"$and":[{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},killMethodObjectiveCondition]},"Transition":"Success"},{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Failure"}]}}}}}

            if (rouletteFilters.includes("specificDisguises", 0)){
                let mainObjectiveDisguiseCondition
                let disguiseObjectiveCondition

                if (selectedDisguiseList[e] == "suit"){
                    disguiseObjectiveCondition = {"$eq":["$Value.OutfitIsHitmanSuit",true]}
                    mainObjectiveDisguiseCondition = {"Type":"hitmansuit","RepositoryId":"0c90c861-48b2-4058-9785-9e577006f3b4","HardCondition":true,"ObjectiveId":disguiseObjectiveId}
                }
                else {
                    disguiseObjectiveCondition = {"$inarray":{"?":{"$eq":["$.#","$Value.OutfitRepositoryId"]},"in":[selectedDisguiseList[e]]}}
                    mainObjectiveDisguiseCondition = {"Type":"disguise","RepositoryId":selectedDisguiseList[e],"HardCondition":true,"ObjectiveId":disguiseObjectiveId}
                }

                if (selectedMission == "LOCATION_EDGY_FOX"){
                    mainObjective.Definition.States.Start.Kill[1].Condition.$and.push(disguiseObjectiveCondition) 
                    mainObjective.Definition.States.Success.Kill[0].Condition.$and.push(disguiseObjectiveCondition)
                    berlinVerificationObjectiveCondition = {"$not":{"$and":[disguiseObjectiveCondition,killMethodObjectiveCondition]}}
                }
                else {
                    mainObjective.TargetConditions.push(mainObjectiveDisguiseCondition)
                }

                let disguiseObjective 

                if (selectedMission != "LOCATION_EDGY_FOX"){
                    if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7"){
                        disguiseObjective = {"Type":"statemachine","Id":disguiseObjectiveId,"BriefingText":"","category":"primary","Definition":{"Scope":"Hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"-":{"Actions":{"$pushunique":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"],"$remove":["Targets",info.RouletteTargetIds[e]]}},"SierraLeftCar":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Pre_Kill":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Kill":[{"Condition":{"$and":[disguiseObjectiveCondition,{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]}]},"Transition":"Success"},{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Failure"}]}}}}
                    }
                    else {
                        disguiseObjective = {"Type":"statemachine","Id":disguiseObjectiveId,"BriefingText":"","category":"primary","Definition":{"Scope":"Hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"Kill":[{"Condition":{"$and":[disguiseObjectiveCondition,{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]}]},"Transition":"Success"},{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Failure"}]}}}}
                    }

                    baseContract.Data.Objectives.push(disguiseObjective)
                }
            } else {
                if (selectedMission == "LOCATION_EDGY_FOX"){
                    berlinVerificationObjectiveCondition = {"$not":killMethodObjectiveCondition}
                }
            }

            baseContract.Data.Objectives.push(mainObjective)

            if (selectedMission != "LOCATION_EDGY_FOX"){
                baseContract.Data.Objectives.push(killMethodObjective)
            }
            else {
                berlinVerificationObjective.Definition.States.Start.Kill[1].Condition.$and.push(berlinVerificationObjectiveCondition)
            }
        }

        if (selectedMission == "LOCATION_EDGY_FOX"){
            baseContract.Data.Objectives.push(berlinVerificationObjective)
        }

        // Handling for Soders objective

        const sodersKillMethodPool = ["pistol", "loud_pistol", "silenced_pistol", "smg", "loud_smg", "silenced_smg", "assaultrifle", "loud_assaultrifle", "silenced_assaultrifle", "shotgun", "loud_shotgun", "silenced_shotgun", "sniperrifle", "loud_sniperrifle", "silenced_sniperrifle", "throwheart", "shootheart", "electrocution", "explosion", "stemcells", "spidermachine"]

        if (selectedMission == "LOCATION_HOKKAIDO"){
            const selectedSodersKillMethod = sodersKillMethodPool[getRandomIntWithSeed( 0, sodersKillMethodPool.length-1, seed++)]

            const selectedSodersDisguise = disguisePool[getRandomIntWithSeed( 0, disguisePool.length-1, seed++)]

            const sodersObjectiveId = randomUUID()

            let pushedSodersKillMethod

            if (["pistol", "loud_pistol", "silenced_pistol", "smg", "loud_smg", "silenced_smg", "assaultrifle", "loud_assaultrifle", "silenced_assaultrifle", "shotgun", "loud_shotgun", "silenced_shotgun", "sniperrifle", "loud_sniperrifle", "silenced_sniperrifle", "explosion"].includes(selectedSodersKillMethod)){
                pushedSodersKillMethod = "Body_Kill"
            }
            else if ((selectedSodersKillMethod == "throwheart") || (selectedSodersKillMethod == "shootheart")){
                pushedSodersKillMethod = "Heart_Kill"
            }
            else if (selectedSodersKillMethod == "electrocution"){
                pushedSodersKillMethod = "Soder_Electrocuted"
            }
            else if (selectedSodersKillMethod == "stemcells"){
                pushedSodersKillMethod = "Poison_Kill"
            }
            else if (selectedSodersKillMethod == "spidermachine"){
                pushedSodersKillMethod = "Spidermachine_Kill"
            }

            let sodersCondition1

            if ((rouletteFilters.includes("specificDisguises", 0)) && (selectedSodersDisguise != "suit")){
                sodersCondition1 = {"Condition":{"$and":[{"$eq":["$.CurrentDisguise",selectedSodersDisguise]},{"$eq":["$Value.Event_metricvalue",pushedSodersKillMethod]}]},"Transition":"Success"}
            }
            else if ((rouletteFilters.includes("specificDisguises", 0)) && (selectedSodersDisguise == "suit")){
                sodersCondition1 = {"Condition":{"$and":[{"$not":{"$any":{"?":{"$eq":["$.#","$.CurrentDisguise"]},"in":["c98a6467-5dd9-4041-8bff-119445750d4d","52992428-8884-48db-9764-e486d17d4804","d6bbbe57-8cc8-45ed-b1cb-d1f9477c4b61","d9e0fbe7-ff74-4030-bed6-5a33a01acead","25406dac-d206-48c7-a6df-dffb887c9227","a8191fb6-9a6d-4145-8baf-d786e6f392b7","3d4424a3-23f9-4cfe-b225-2e06c17d780b","6a25f81d-cf2e-4e47-9b15-0f712a3f71d9","5270225d-797a-43f8-8435-078ae0d92249","f6f53c39-17f9-48cf-9594-7a696b036d61","b8deb948-a0a9-4dcb-9df4-1c2ecd29765f","b00380d9-3f84-4484-8bd6-39c0872da414","427bac46-50b4-4470-9b0e-478efcd37793","f4ea7065-d32b-4a97-baf9-98072a9c8128","b8dbb7b6-fef9-4782-923f-ddebc573625e","06456d4d-da36-4008-bea5-c0b985a565f5","8e01f48f-ef06-448c-9d22-5d58c4414968","5946924c-958d-48f4-ada3-86beb58aa778"]}}},{"$eq":["$Value.Event_metricvalue",pushedSodersKillMethod]}]},"Transition":"Success"}
            }
            else {
                sodersCondition1 = {"Condition":{"$eq":["$Value.Event_metricvalue",pushedSodersKillMethod]},"Transition":"Success"}
            }

            const sodersCondition2 = {"Condition":{"$eq":["$Value.Event_metricvalue",pushedSodersKillMethod]},"Transition":"Failure"}

            const sodersObjective = {"Category":"primary","ObjectiveType":"setpiece","Image":"images/actors/Snowcrane_erich_soders_briefing.jpg","DisplayAsKillObjective":false,"ForceShowOnLoadingScreen":true,"Type":"statemachine","Definition":{"Context":{"CurrentDisguise":"unknown","TrackDisguiseChanges":true,"Targets":["5651198f-9ef7-4f3c-908b-a570f1cd64e2"],"TargetOpportunities":["d2e5bf2d-b6cd-474f-88b1-6aa0c7e641c3","dd0ef769-afd7-4754-8058-0677b958d91a","b3a982f1-2773-4a97-8492-614b897a8f98","15af2544-833e-459e-9de9-39c109b6f732"]},"States":{"Start":{"StartingSuit":{"Actions":{"$set":["CurrentDisguise","$Value"]}},"OpportunityEvents":{"Condition":{"$and":[{"$eq":["$Value.Event","Disabled"]},{"$inarray":{"in":"$.TargetOpportunities","?":{"$eq":["$.#","$Value.RepositoryId"]}}}]},"Actions":{"$set":["TrackDisguiseChanges",false]}},"Disguise":{"Condition":{"$eq":["$.TrackDisguiseChanges",true]},"Actions":{"$set":["CurrentDisguise","$Value"]}},"Level_Setup_Events":[sodersCondition1,sodersCondition2,{"Condition":{"$any":{"?":{"$eq":["$.#","$Value.Event_metricvalue"]},"in":["Heart_Kill","Soder_Electrocuted","Poison_Kill","Spidermachine_kill","Body_Kill"]}},"Transition":"Failure"}]}}},"Id":sodersObjectiveId,"BriefingName":"","BriefingText":"balls","LongBriefingText":"balls","HUDTemplate":""}

            baseContract.Data.Objectives.splice(0, 0, sodersObjective)
        }

        // Handling for other extra objectives

        function additionalObjectives(selectedMission){
            switch (selectedMission){
                case "LOCATION_ICA_FACILITY_SHIP":
                case "LOCATION_ICA_FACILITY":
                case "LOCATION_PARIS":
                case "LOCATION_PARIS_NOEL":
                case "LOCATION_COASTALTOWN_MOVIESET":
                case "LOCATION_COASTALTOWN_NIGHT":
                case "LOCATION_MARRAKECH":
                case "LOCATION_BANGKOK":
                case "LOCATION_BANGKOK_ZIKA":
                case "LOCATION_COLORADO":
                case "LOCATION_HOKKAIDO_MAMUSHI":
                case "LOCATION_MIAMI_COTTONMOUTH":
                case "LOCATION_COLOMBIA":
                case "LOCATION_MUMBAI_KINGCOBRA":
                case "LOCATION_NORTHAMERICA_GARTERSNAKE":
                case "LOCATION_OPULENT_STINGRAY":
                    break
                case "LOCATION_COASTALTOWN":
                    return [{"Id":"e15b5171-2b12-4966-9339-3344042f9867","ObjectiveType":"setpiece","ForceShowOnLoadingScreen":true,"Image":"images/contracts/octopus/Contract_Octopus_Virus_ObjectiveTile.jpg","BriefingName":"$loc UI_CONTRACT_OCTOPUS_VIRUS_BRIEFING_NAME","LongBriefingText":"$loc UI_CONTRACT_OCTOPUS_VIRUS_BRIEFING_DESC","Category":"primary","HUDTemplate":{"display":"$loc UI_CONTRACT_OCTOPUS_OBJ_2"},"BriefingText":"$loc UI_CONTRACT_OCTOPUS_OBJ_2","Type":"statemachine","Definition":{"Context":{"Targets":["53629764-635d-4d11-b671-7ba9b5a03298"]},"States":{"Start":{"VirusDestroyed":[{"Transition":"Success"}]}}}},{"Id":"5ff67d0f-9fcc-4775-ad60-364e69571388","Category":"primary","ExcludeFromScoring":true,"OnActive":{"IfCompleted":{"Visible":false}},"BriefingText":"$loc UI_CONTRACT_OCTOPUS_FAIL_SILVIO_ESCAPED","HUDTemplate":{"display":"$loc UI_CONTRACT_OCTOPUS_OBJ_3"},"Type":"statemachine","Definition":{"Context":{},"States":{"Start":{"-":{"Transition":"Success"}},"Success":{"SilvioSeaplaneEscaping":{"Transition":"EscapeCountdownStart"}},"EscapeCountdownStart":{"$timer":{"Condition":{"$after":90},"Transition":"Failure"},"Kill":[{"Condition":{"$eq":["$Value.RepositoryId","0dfaea51-3c36-4722-9eff-f1e7ef139878"]},"Transition":"Success"}]}}}}]
                case "LOCATION_COASTALTOWN_EBOLA":
                    return [{"Id":"f6d7ccfd-6f0b-4e01-b80f-982c051c4c8e","Category":"primary","ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/contracts/whitespider/002_ebola/WS_Ebola_Virus_Sample.jpg","BriefingName":"$loc UI_CONTRACT_EBOLA_OBJ_3_TITLE","BriefingText":"$loc UI_CONTRACT_EBOLA_OBJ_3_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_EBOLA_OBJ_3"},"Type":"statemachine","Definition":{"Context":{"Targets":["8521184b-4899-4e63-b9d0-e0bf830706a3"]},"States":{"Start":{"ItemPickedUp":{"Condition":{"$eq":["$Value.RepositoryId","8521184b-4899-4e63-b9d0-e0bf830706a3"]},"Transition":"Success"}}}}}]
                case "LOCATION_MARRAKECH_NIGHT":
                    return [{"Id":"341c93cc-05b5-45df-8b32-17ffa44e29ac","Category":"primary","ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/unlockables/item_perspective_74a4f6ee-b465-437c-bef9-3a67c9932853_0.jpg","BriefingName":"$loc UI_CONTRACT_PYTHON_OBJ_DOCS_DESC_SHORT","BriefingText":"$loc UI_CONTRACT_PYTHON_OBJ_DOCS_NAME","LongBriefingText":"$loc UI_CONTRACT_PYTHON_OBJ_DOCS_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_PYTHON_OBJ_DOCS_NAME"},"Type":"statemachine","Definition":{"Context":{"Targets":["74a4f6ee-b465-437c-bef9-3a67c9932853"]},"States":{"Start":{"ItemPickedUp":{"Condition":{"$eq":["$Value.RepositoryId","74a4f6ee-b465-437c-bef9-3a67c9932853"]},"Transition":"Success"}}}}}]
                case "LOCATION_HOKKAIDO":
                    return [{"Id":"5b1534ef-7848-440c-855a-d2635663dd74","Category":"primary","ExcludeFromScoring":true,"OnActive":{"IfCompleted":{"Visible":false}},"BriefingText":"$loc UI_CONTRACT_SNOWCRANE_FAIL_ESCAPE","HUDTemplate":{"display":"$loc UI_CONTRACT_SNOWCRANE_OBJ_ESCAPE"},"Type":"statemachine","Definition":{"Context":{},"States":{"Start":{"-":{"Transition":"Success"}},"Success":{"TargetEscapeStarted":{"Transition":"Countdown"}},"Countdown":{"TargetEscapeFoiled":{"Transition":"Success"},"$timer":{"Condition":{"$after":45},"Transition":"Failure"},"Kill":{"Condition":{"$eq":["$Value.RepositoryId","9bebb40a-3746-4ba2-8bfc-a1fcabaec72c"]},"Transition":"Success"}}}}}]
                case "LOCATION_HOKKAIDO_FLU":
                    return [{"Id":"b8ffc636-4f9a-49b5-8293-98839a6ca202","ObjectiveType":"custom","IgnoreIfInactive":true,"OnActive":{"IfCompleted":{"Visible":false}},"OnInactive":{"IfCompleted":{"State":"Completed"}},"Image":"images/contracts/whitespider/004_flu/Eliminate_Infected_Obj.jpg","BriefingName":"$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD","BriefingText":"$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ","Category":"primary","HUDTemplate":{"display":"$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ","iconType":19},"Type":"statemachine","Definition":{"ContextListeners":{"TargetsCounter":{"type":"objective-counter","header":"UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD"}},"Context":{"KilledActors":[],"Targets":[],"TargetsCounter":0},"States":{"Start":{"-":{"Transition":"Success"}},"Success":{"TargetPicked":[{"Condition":{"$not":{"$eq":["3798fcf3-4e33-40db-a8a2-c160a3ec55bf","01822ba2-7b3b-4bbd-a9f3-cf8006ba945a"]}},"Actions":{"$inc":"TargetsCounter","$pushunique":["Targets","$Value.RepositoryId"]},"Transition":"TargetPicked"}]},"TargetPicked":{"TargetPicked":[{"Condition":{"$not":{"$eq":["3798fcf3-4e33-40db-a8a2-c160a3ec55bf","01822ba2-7b3b-4bbd-a9f3-cf8006ba945a"]}},"Actions":{"$inc":"TargetsCounter","$pushunique":["Targets","$Value.RepositoryId"]}}],"Kill":[{"Actions":{"$pushunique":["KilledActors","$Value.RepositoryId"]}},{"Actions":{"$dec":"TargetsCounter"},"Condition":{"$inarray":{"in":"$.Targets","?":{"$eq":["$.#","$Value.RepositoryId"]}}}},{"Condition":{"$all":{"in":"$.Targets","?":{"$any":{"in":"$.KilledActors","?":{"$eq":["$.#","$.##"]}}}}},"Transition":"Success"}],"ContractLoad":[{"Actions":{"$set":["TargetsCounter","$.TargetsCounter"]}}]}}}},{"Id":"2c22eb96-bad8-4514-83c4-eece9c2c5988","ObjectiveType":"custom","IgnoreIfInactive":true,"OnActive":{"IfInProgress":{"Visible":false},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":true}},"Image":"images/contracts/whitespider/004_flu/Eliminate_Infected_Obj.jpg","BriefingName":"$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD","BriefingText":"$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ","ExcludeFromScoring":true,"Category":"secondary","HUDTemplate":{"display":"$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ","iconType":19},"Type":"statemachine","Definition":{"ContextListeners":{"TotalTargetsCounter":{"type":"objective-counter","header":"UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD"}},"Context":{"TotalTargetsCounter":0},"States":{"Start":{"TargetPicked":[{"Actions":{"$inc":"TotalTargetsCounter"}}],"ContractLoad":[{"Actions":{"$set":["TotalTargetsCounter","$.TotalTargetsCounter"]}}],"ContractEnd":[{"Transition":"Success"}],"exit_gate":[{"Transition":"Success"}]}}}},{"Id":"85745a86-a55a-4286-bff8-44a7960f87c8","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"47_Infected":{"Transition":"Success"}}}}},{"Id":"e98be877-94bb-40a8-959f-5353a7704825","ObjectiveType":"custom","IgnoreIfInactive":true,"OnActive":{"IfCompleted":{"Visible":false}},"Activation":{"$eq":["$85745a86-a55a-4286-bff8-44a7960f87c8","Completed"]},"Image":"images/contracts/whitespider/004_flu/WS_Flu_Obj_Antidote.jpg","BriefingName":"$loc UI_CONTRACT_FLU_ANTIDOTE_TITLE","BriefingText":"$loc UI_CONTRACT_FLU_ANTIDOTE_DESC","Category":"primary","HUDTemplate":{"display":"$loc UI_CONTRACT_FLU_ANTIDOTE_OBJ"},"Type":"statemachine","Definition":{"Context":{"Targets":["d940d53e-738c-4033-8bfd-c2ee28ae4e8a"]},"States":{"Start":{"-":{"Transition":"Success"}},"Success":{"47_Infected":{"Transition":"Get_Antidote"}},"Get_Antidote":{"47_Cured":{"Transition":"Success"},"$timer":{"Condition":{"$after":300},"Transition":"Failure"}}}}}]
                case "LOCATION_NEWZEALAND":
                    return [{"_comment":"----- Enter House -----","Id":"2022ec96-b328-4aa7-a309-507fd263b235","Category":"primary","ExcludeFromScoring":true,"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/actors/Sheep_Enter_House.jpg","BriefingName":"$loc UI_CONTRACT_SHEEP_ENTER_NAME","BriefingText":"$loc UI_CONTRACT_SHEEP_ENTER_DESC","LongBriefingText":"$loc UI_CONTRACT_SHEEP_ENTER_LONGDESC","HUDTemplate":{"display":"$loc UI_CONTRACT_SHEEP_ENTER_NAME","iconType":17},"Type":"statemachine","Definition":{"States":{"Start":{"HouseEnteredEvent":{"Transition":"Success"}}}}},{"_comment":"----- Gather intel -----","Id":"55b42190-ab18-404e-8686-b60358dea1d4","Category":"primary","Primary":true,"ExcludeFromScoring":true,"ObjectiveType":"custom","UpdateActivationWhileCompleted":true,"ForceShowOnLoadingScreen":true,"Image":"images/actors/Sheep_Gather_Intel.jpg","BriefingName":"$loc UI_CONTRACT_SHEEP_INTEL_NAME","BriefingText":"$loc UI_CONTRACT_SHEEP_INTEL_DESC","LongBriefingText":"$loc UI_CONTRACT_SHEEP_INTEL_LONGDESC","HUDTemplate":{"display":"$loc UI_CONTRACT_SHEEP_INTEL_NAME","iconType":17},"Activation":{"$eq":["$2022ec96-b328-4aa7-a309-507fd263b235","Completed"]},"Type":"statemachine","Definition":{"States":{"Start":{"IntelGatheredEvent":{"Transition":"Success"}}}},"OnInactive":{"IfCompleted":{"State":"Completed","Visible":false}},"OnActive":{"IfCompleted":{"Visible":true}}}]
                case  "LOCATION_MIAMI":
                    return [{"Id":"e4b445db-bf1a-4239-acdc-83d945d198a7","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"Definition":{"Scope":"session","Context":{},"States":{"Start":{"TargetEscapeStarted":{"Transition":"Success"}}}}},{"Id":"5b1534ef-7848-440c-855a-d2635663dd74","Category":"primary","ExcludeFromScoring":true,"IgnoreIfInactive":true,"Activation":{"$eq":["$e4b445db-bf1a-4239-acdc-83d945d198a7","Completed"]},"OnActive":{"IfCompleted":{"Visible":false}},"BriefingText":"$loc UI_CONTRACT_FLAMINGO_ROBERT_ESCAPED","HUDTemplate":{"display":"$loc UI_CONTRACT_FLAMINGO_ROBERT_ESCAPING"},"Type":"statemachine","Definition":{"Context":{},"States":{"Start":{"TargetEscapeStarted":{"Transition":"TargetIsEscaping"}},"TargetIsEscaping":{"TargetEscaped":{"Transition":"Failure"},"Kill":{"Condition":{"$eq":["$Value.RepositoryId","ee454990-0c4b-49e5-9572-a67887325283"]},"Transition":"Success"}}}}}]
                case "LOCATION_COLOMBIA_ANACONDA":
                    return [{"Id":"d61d68e2-1e72-4c50-9c65-f2106ae30a9d","Category":"primary","ObjectiveType":"custom","Image":"images/unlockables/item_perspective_e5bde241-5958-496d-9d2d-39932fe93123_0.jpg","ForceShowOnLoadingScreen":true,"BriefingName":"$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_NAME","BriefingText":"$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_TEXT","LongBriefingText":"$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_LONG","HUDTemplate":{"display":"$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_HUD","iconType":17},"Type":"statemachine","Definition":{"Context":{"Targets":["e5bde241-5958-496d-9d2d-39932fe93123"]},"States":{"Start":{"ItemPickedUp":{"Condition":{"$eq":["$Value.RepositoryId","e5bde241-5958-496d-9d2d-39932fe93123"]},"Transition":"Success"}}}}}]
                case "LOCATION_MUMBAI":
                    return [{"_comment":"----- Identify the Maelstrom -----","Id":"7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2","Category":"primary","ExcludeFromScoring":true,"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/actors/mongoose_wazir_kale.jpg","BriefingName":"$loc UI_CONTRACT_MONGOOSE_OBJ_ID_TITLE","BriefingText":"$loc UI_CONTRACT_MONGOOSE_OBJ_ID_DESC","LongBriefingText":"$loc UI_CONTRACT_MONGOOSE_OBJ_ID_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_MONGOOSE_OBJ_ID_TITLE","iconType":17},"Type":"statemachine","Definition":{"States":{"Start":{"IdentifyMaelstrom":{"Transition":"Success"}}}}},{"_comment":"----- Eliminate the Maelstrom Identified -----","Id":"85c5ac7e-55ba-44fc-9225-82e6c1250b51","UpdateActivationWhileCompleted":true,"IsHidden":false,"Category":"primary","Activation":{"$eq":["$7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2","Completed"]},"SuccessEvent":{"EventName":"Kill","EventValues":{"RepositoryId":"c7c9e213-16f9-4215-bf07-dd8f801ce3e0"}},"OnActive":{"IfCompleted":{"Visible":true}},"OnInactive":{"IfCompleted":{"State":"Completed"}}},{"_comment":"----- Eliminate the Maelstrom Not identified -----","Id":"7161cbf5-af3a-4a1b-b2b8-60437c4e8187","UpdateActivationWhileCompleted":true,"IsHidden":true,"ExcludeFromScoring":true,"Category":"primary","Activation":{"$eq":["$7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2","InProgress"]},"SuccessEvent":{"EventName":"Kill","EventValues":{"RepositoryId":"c7c9e213-16f9-4215-bf07-dd8f801ce3e0"}},"OnInactive":{"IfCompleted":{"State":"Completed","Visible":false}},"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false}}}]
                case "LOCATION_NORTHAMERICA":
                    return [{"_comment":"----- Find Clues Dynamic Counter -----","Id":"369dd2f7-acfa-4c51-b03d-dbbb4bb863ac","Category":"primary","ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/actors/skunk_trackingtheconstant.jpg","BriefingName":"$loc UI_CONTRACT_SKUNK_OBJ_CLUES_TITLE","LongBriefingText":"$loc UI_CONTRACT_SKUNK_OBJ_CLUES_DESC","BriefingText":"$loc UI_CONTRACT_SKUNK_OBJ_CLUES_HEADER","HUDTemplate":{"display":"$loc UI_CONTRACT_SKUNK_OBJ_CLUES_TITLE","iconType":17},"Type":"statemachine","Scope":"hit","Definition":{"ContextListeners":{"update_counter":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_SKUNK_OBJ_CLUES_DYNAMIC_TITLE","data":["$.IntelCounter","$.total"]}},"iconType":17}}},"Context":{"IntelCounter":0,"update_counter":1,"total":3},"States":{"Start":{"One_Clue_Found":{"Actions":{"$inc":"IntelCounter","$dec":"update_counter"}},"Two_Clues_Found":{"Actions":{"$inc":"IntelCounter","$dec":"update_counter"}},"Three_Clues_Found":{"Actions":{"$inc":"IntelCounter","$dec":"update_counter"}},"AllCluesCollected":{"Transition":"Success"}}}}},{"Id":"8d1a5ed6-2e2d-427e-b88b-b31c1d2a9d87","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":true},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"BackgroundCheckStarted":{"Transition":"Failure"}}}}},{"Activation":{"$eq":["$8d1a5ed6-2e2d-427e-b88b-b31c1d2a9d87","Failed"]},"HUDTemplate":{"display":"$loc UI_CONTRACT_SKUNK_TIMER_BACKGROUNDCHECK"},"Id":"f92b9623-6cb5-44cb-b9a2-bf483a3bfe1d","Scope":"session","Type":"statemachine","Category":"secondary","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":false}},"Definition":{"ContextListeners":{"Timeout":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_HAWK_TIMER_TIMED_OUT","data":[]}}}}},"Context":{"Timeout":1},"States":{"Start":{"BeginTimer":{"Transition":"TimerRunning"}},"TimerRunning":{"$timer":{"Condition":{"$after":300},"Actions":{"$dec":"Timeout"},"Transition":"Failure"},"EndTimer":{"Transition":"Failure"}}}}}]
                case "LOCATION_NORTHSEA":
                    return [{"_comment":"----- [HIDDEN] Do not Eliminate The Constant -----","Id":"a50652e6-eccb-4491-97ea-d03ca15b11a0","Primary":true,"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"ExcludeFromScoring":true,"OnActive":{"IfFailure":{"Visible":true}},"Image":"images/actors/Magpie_The_Constant.jpg","BriefingName":"$loc UI_CONTRACT_MAGPIE_CONSTANT_NAME","BriefingText":"$loc UI_CONTRACT_MAGPIE_CONSTANT_OBJ","HUDTemplate":{"display":"$loc UI_CONTRACT_MAGPIE_CONSTANT_OBJ","iconType":17},"Type":"statemachine","Definition":{"display":{"iconType":17},"Scope":"session","States":{"Start":{"Constant_Down":{"Transition":"Failure"}}}}},{"Id":"0b6010b3-988f-4066-90ff-1f872128aff4","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"Definition":{"Scope":"session","Context":{},"States":{"Start":{"ActivateConstantObjective":{"Transition":"Success"}}}}},{"_comment":"----- [OPTIONAL] Help Grey Kidnap The Constant -----","Id":"9eb900f5-4d1e-4464-8ea9-1a9df6b869d0","Category":"secondary","UpdateActivationWhileCompleted":false,"IgnoreIfInactive":true,"ExcludeFromScoring":true,"OnInactive":{"IfCompleted":{"State":"Completed","Visible":false}},"Activation":{"$eq":["$0b6010b3-988f-4066-90ff-1f872128aff4","Completed"]},"OnActive":{"IfCompleted":{"Visible":true}},"ObjectiveType":"custom","Image":"images/actors/Magpie_The_Constant.jpg","BriefingName":"$loc UI_CONTRACT_MAGPIE_CONSTANT_NAME","BriefingText":"$loc UI_CONTRACT_MAGPIE_KIDNAP_CONSTANT_OBJ","HUDTemplate":{"display":"$loc UI_CONTRACT_MAGPIE_KIDNAP_CONSTANT_OBJ","iconType":17},"Type":"statemachine","Definition":{"display":{"iconType":17},"Scope":"session","States":{"Start":{"ActivateConstantObjective":{"Transition":"SecureConstant"}},"SecureConstant":{"ConstantSecured":{"Transition":"Success"}}}}},{"_comment":"----- The Constant Escaped -----","Id":"5ff67d0f-9fcc-4775-ad60-364e69571388","Category":"primary","ExcludeFromScoring":true,"OnActive":{"IfCompleted":{"Visible":false}},"BriefingText":"$loc UI_CONTRACT_MAGPIE_CONSTANT_ESCAPED_OBJ","HUDTemplate":{"display":"$loc UI_CONTRACT_MAGPIE_CONSTANT_ESCAPED_OBJ","iconType":17},"Type":"statemachine","Definition":{"Context":{},"display":{"iconType":17},"States":{"Start":{"-":{"Transition":"Success"}},"Success":{"ConstantOnChopper":{"Transition":"EscapeCountdownStart"}},"EscapeCountdownStart":{"BothTwinsDead":{"Transition":"Success"},"$timer":{"Condition":{"$after":300},"Transition":"Failure"}}}}}]
                case "LOCATION_GREEDY_RACCOON":
                    return [{"_comment":"----- Get McGuffin -----","Id":"b6dae5cd-31f7-4c81-8ccb-b0b9c58c791d","UpdateActivationWhileCompleted":true,"Category":"primary","Primary":true,"ObjectiveType":"custom","ExcludeFromScoring":true,"ForceShowOnLoadingScreen":true,"Image":"images/actors/raccoon-gather-intel.jpg","BriefingName":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_TITLE","BriefingText":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DESC","LongBriefingText":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_BRIEFING","HUDTemplate":{"display":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_TITLE","iconType":17},"Type":"statemachine","Scope":"session","Definition":{"ContextListeners":{"update_counter":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DYNAMIC","data":["$.Core","$.Disks"]}},"iconType":17}}},"Context":{"Core":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GET","Disks":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_0","Core_Get":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GET","Core_Got":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GOT","Disk_0":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_0","Disk_1":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_1","Disk_2":"$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_2","PieceCounter":0,"update_counter":0},"States":{"Start":{"-":{"Actions":{"$inc":"update_counter"}},"DiskPieceFound":{"Actions":{"$inc":"PieceCounter"},"Transition":"DiskText"},"McGuffinGotEvent":{"Actions":{"$set":["Core","$.Core_Got"]},"Transition":"Success"}},"DiskText":{"-":[{"Condition":{"$eq":["$.PieceCounter",0]},"Actions":{"$set":["Disks","$.Disk_0"]}},{"Condition":{"$eq":["$.PieceCounter",1]},"Actions":{"$set":["Disks","$.Disk_1"]}},{"Condition":{"$eq":["$.PieceCounter",2]},"Actions":{"$set":["Disks","$.Disk_2"]}},{"Condition":{"$eq":["$.PieceCounter",3]},"Actions":{"$set":["Core",""]},"Transition":"Success"},{"Actions":{"$set":["Core","$.Core_Get"]},"Transition":"Start"}]},"Success":{"-":{"Actions":{"$set":["Disks",""],"$inc":"update_counter"}},"McGuffinLostEvent":{"Transition":"DiskText"},"DiskPieceFound":[{"Actions":{"$inc":"PieceCounter"}},{"Condition":{"$eq":["$.PieceCounter",3]},"Transition":"DiskText"}]}}}},{"_comment":"----- Scoring Dummy for DataCore Objective -----","Id":"dc87ba2d-2e2d-4a9d-9fd9-ce005345425a","Category":"primary","Primary":true,"ObjectiveType":"custom","Image":"","BriefingName":"","BriefingText":"","Type":"statemachine","Scope":"session","Definition":{"States":{"Start":{"exit_gate":{"Transition":"Success"}}}}}]
                case "LOCATION_GOLDEN_GECKO":
                    return [{"_comment":"----- Marcus Stuyvesant Escape -----","Id":"9571d196-8d67-4d94-8dad-6e2d970d7a91","Category":"primary","ExcludeFromScoring":true,"OnActive":{"IfCompleted":{"Visible":false}},"BriefingText":"$loc UI_CONTRACT_GECKO_FAIL_ESCAPE_MARCUS","HUDTemplate":{"display":"$loc UI_CONTRACT_GECKO_OBJ_ESCAPE_MARCUS"},"Type":"statemachine","Definition":{"Context":{},"States":{"Start":{"-":{"Transition":"Success"}},"Success":{"MarcusEscapeStarted":{"Transition":"Countdown"}},"Countdown":{"MarcusEscapeFoiled":{"Transition":"Success"},"$timer":{"Condition":{"$after":20},"Transition":"Failure"},"Kill":{"Condition":{"$eq":["$Value.RepositoryId","88f7ec38-c083-4de0-9004-c1e4f0e4fba0"]},"Transition":"Success"}}}}},{"_comment":"----- Carl Ingram Escape -----","Id":"e9722da6-65e2-49b1-b951-a82efc54ea35","Category":"primary","ExcludeFromScoring":true,"OnActive":{"IfCompleted":{"Visible":false}},"BriefingText":"$loc UI_CONTRACT_GECKO_FAIL_ESCAPE_INGRAM","HUDTemplate":{"display":"$loc UI_CONTRACT_GECKO_OBJ_ESCAPE_INGRAM"},"Type":"statemachine","Definition":{"Context":{},"States":{"Start":{"-":{"Transition":"Success"}},"Success":{"IngramEscapeStarted":{"Transition":"Countdown"}},"Countdown":{"IngramEscapeFoiled":{"Transition":"Success"},"$timer":{"Condition":{"$after":20},"Transition":"Failure"},"Kill":{"Condition":{"$eq":["$Value.RepositoryId","bd0689d6-07b4-4757-b8ee-cac19f1c9e16"]},"Transition":"Success"}}}}}]
                case "LOCATION_ANCESTRAL_BULLDOG":
                    return [{"_comment":"----- Find the Case File -----","Id":"ccb699ba-e975-40bd-aa7b-9b3c88cd6448","Category":"primary","ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/actors/Ancestral_gather_intel.jpg","BriefingName":"$loc UI_CONTRACT_BULLDOG_OBJ_FILE_NAME","BriefingText":"$loc UI_CONTRACT_BULLDOG_OBJ_FILE_TEXT","LongBriefingText":"$loc UI_CONTRACT_BULLDOG_OBJ_FILE_LONG","HUDTemplate":{"display":"$loc UI_CONTRACT_BULLDOG_OBJ_FILE_TEXT","iconType":17},"Type":"statemachine","Definition":{"Context":{"CaseFile":["e5bde241-5958-496d-9d2d-39932fe93123"],"Casepart":["a7afa677-83d0-4aba-82f4-78654de07ed2","79fc044c-e3cc-4f92-8402-394a1699d4c3"]},"States":{"Start":{"CaseFileAcquired":{"Transition":"Success"},"BothCasePartsAcquired":{"Transition":"Success"}}}}}]
                case "LOCATION_EDGY_FOX":
                    return [{"_comment":"----- Silent objective to trigger Olivia Objective -----","Id":"52c2496a-34e9-48da-98ce-4cf12b8e53c5","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"StartOliviaObjective":{"Transition":"Success"}}}}},{"_comment":"----- Hidden objective to check for lesser targets killed before being active -----","Id":"8814dcc8-cc82-47e3-9536-19211d65ec07","IgnoreIfInactive":true,"UpdateActivationWhileCompleted":true,"IsHidden":true,"ExcludeFromScoring":true,"Category":"primary","OnInactive":{"IfCompleted":{"State":"Completed","Visible":false},"IfInProgress":{"Visible":false}},"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false}},"Activation":{"$eq":["$52c2496a-34e9-48da-98ce-4cf12b8e53c5","Completed"]},"Type":"statemachine","Scope":"hit","Definition":{"ContextListeners":{"RemainingTargetsCount":{"type":"objective-counter","header":"UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_COUNT_HEAD"}},"Context":{"Targets":["252428ca-3f8e-4477-b2b9-58f18cff3e44","abd1c0e7-e406-43bd-9185-419029c5bf3d","922deccd-7fb4-45d9-ae3d-2cf11915c403","b8e7e65b-587e-471b-894d-282cda6614d4","2ab07903-e958-4af6-b01c-b62058745ce1","28cb7e91-bf9c-46ee-a371-1bd1448f1994","633398ac-c4b4-4441-852d-ae6460172025","eb024a5e-9580-49dc-a519-bb92c886f3b1","1305c2e4-6394-4cfa-b873-22adbd0c9702","f83376a4-6e56-4f2a-8122-151b272108fd","8b29da09-461f-44d7-9042-d4fde829b9f2"],"RemainingTargetsCount":11},"States":{"Start":{"Kill":[{"Actions":{"$dec":"RemainingTargetsCount"},"Condition":{"$inarray":{"in":"$.Targets","?":{"$eq":["$.#","$Value.RepositoryId"]}}}},{"Condition":{"$eq":["$.RemainingTargetsCount",0]},"Transition":"Success"}],"FoxTargetIdentification":[{"Actions":{"$remove":["Targets","$Value.RepositoryId"]}},{"Condition":{"$eq":["$.RemainingTargetsCount",0]},"Transition":"Success"}]}}}},{"_comment":"------ First objective from default starting location: Contact Olivia Obj -----","Id":"be29b79d-68b5-49df-a07d-d8fe58b766e5","Category":"secondary","IgnoreIfInactive":true,"Activation":{"$eq":["$52c2496a-34e9-48da-98ce-4cf12b8e53c5","Completed"]},"ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":false}},"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/contracts/fox/Fox_Contact_Olivia.jpg","BriefingName":"$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_TITLE","BriefingText":"$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_HEADER","LongBriefingText":"$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_TITLE","iconType":17},"Type":"statemachine","Definition":{"States":{"Start":{"ObjectiveOliviaFinishPt1":{"Transition":"Success"}}}}},{"_comment":"----- Second objective from default starting location: Find Olivia Obj -----","Id":"4402ad59-e4b2-4de5-ad58-d1fa8b163810","IgnoreIfInactive":true,"Category":"secondary","Activation":{"$eq":["$be29b79d-68b5-49df-a07d-d8fe58b766e5","Completed"]},"ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":false}},"ObjectiveType":"custom","ForceShowOnLoadingScreen":false,"Image":"images/contracts/fox/Fox_Locate_Olivia.jpg","BriefingName":"$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_TITLE","BriefingText":"$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_HEADER","LongBriefingText":"$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_TITLE","iconType":17},"Type":"statemachine","Definition":{"States":{"Start":{"ObjectiveOliviaFinishPt2":{"Transition":"Success"}}}}},{"_comment":"----- Silent objective to trigger Pickup earpiece objective -----","IgnoreIfInactive":true,"Id":"dce61868-a885-42fd-9274-d48ddb0d30aa","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"EarpieceObjectiveStart":{"Transition":"Success"}}}}},{"_comment":"----- Optional Objective from default starting location: Pick up earpiece -----","IgnoreIfInactive":true,"Id":"2a52744b-e290-43ce-9e18-115180d3d460","Category":"secondary","Activation":{"$eq":["$dce61868-a885-42fd-9274-d48ddb0d30aa","Completed"]},"ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":false}},"ObjectiveType":"custom","ForceShowOnLoadingScreen":false,"Image":"images/contracts/fox/Fox_Pickup_Earpiece.jpg","BriefingName":"$loc UI_CONTRACT_FOX_OBJ_EARPIECE_TITLE","BriefingText":"$loc UI_CONTRACT_FOX_OBJ_EARPIECE_HEADER","LongBriefingText":"$loc UI_CONTRACT_FOX_OBJ_EARPIECE_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_FOX_OBJ_EARPIECE_TITLE","iconType":17},"Type":"statemachine","Definition":{"States":{"Start":{"EarpieceObjectiveComplete":{"Transition":"Success"}}}}},{"_comment":"----- DEFAULT SL: Silent Objective to trigger main objective -----","Id":"642e7f65-72ef-4a77-abd4-ea2d4454cd31","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"StartMainObjectives":{"Transition":"Success"}}}}},{"_comment":"----- OTHER SL: Silent Objective to trigger main objective -----","Id":"ec243189-3a89-4d6b-b1f7-958d95658e2b","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"StartMainObjective_OtherSL":{"Transition":"Success"}}}}},{"_comment":"----- OTHER SL:  Eliminate Agents -----","Id":"11d9655f-190c-4181-be5f-30cadd50dc3c","IgnoreIfInactive":true,"Category":"primary","Activation":{"$eq":["$ec243189-3a89-4d6b-b1f7-958d95658e2b","Completed"]},"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/contracts/fox/Fox_Eliminate_Lesser_Obj.jpg","BriefingName":"$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_TITLE","BriefingText":"$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HEADER","LongBriefingText":"$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_TITLE"},"Type":"statemachine","Scope":"session","Definition":{"ContextListeners":{"update_counter":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HUD","data":["$.AgentsKilledCounter","$.AgentsKilledGoal"]}}}}},"Context":{"Targets":["252428ca-3f8e-4477-b2b9-58f18cff3e44","abd1c0e7-e406-43bd-9185-419029c5bf3d","922deccd-7fb4-45d9-ae3d-2cf11915c403","b8e7e65b-587e-471b-894d-282cda6614d4","2ab07903-e958-4af6-b01c-b62058745ce1","28cb7e91-bf9c-46ee-a371-1bd1448f1994","633398ac-c4b4-4441-852d-ae6460172025","eb024a5e-9580-49dc-a519-bb92c886f3b1","1305c2e4-6394-4cfa-b873-22adbd0c9702","f83376a4-6e56-4f2a-8122-151b272108fd","8b29da09-461f-44d7-9042-d4fde829b9f2"],"AgentsKilledCounter":0,"AgentsKilledGoal":5,"update_counter":1},"States":{"Start":{"StartMainObjective_OtherSL":{"Transition":"CheckKills"}},"CheckKills":{"Kill":[{"Actions":{"$inc":"AgentsKilledCounter","$dec":"update_counter"},"Condition":{"$inarray":{"in":"$.Targets","?":{"$eq":["$.#","$Value.RepositoryId"]}}}},{"Condition":{"$eq":["$.AgentsKilledCounter",5]},"Transition":"Success"}]}}}},{"_comment":"----- DEFAULT SL: Eliminate Agents -----","Id":"47de2b7d-eae7-4d60-9987-154078ff11e9","IgnoreIfInactive":true,"Category":"primary","Activation":{"$eq":["$642e7f65-72ef-4a77-abd4-ea2d4454cd31","Completed"]},"OnActive":{"IfCompleted":{"Visible":true}},"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/contracts/fox/Fox_Eliminate_Lesser_Obj.jpg","BriefingName":"$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_SH_TITLE","BriefingText":"$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HEADER","LongBriefingText":"$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_SH_TITLE"},"Type":"statemachine","Scope":"session","Definition":{"ContextListeners":{"update_counter":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HUD","data":["$.AgentsKilledCounter","$.Questionmark"]}}}}},"Context":{"Targets":[],"Questionmark":"?","AgentsKilledCounter":0,"AgentsKilledGoal":5,"update_counter":1},"States":{"Start":{"StartMainObjectives":{"Transition":"CheckKills"}},"CheckKills":{"FoxTargetIdentification":{"Actions":{"$pushunique":["Targets","$Value.RepositoryId"]}},"Kill":[{"Actions":{"$inc":"AgentsKilledCounter","$dec":"update_counter"},"Condition":{"$eq":["$Value.IsTarget",true]}},{"Condition":{"$eq":["$.AgentsKilledCounter",5]},"Transition":"Success"}]},"Success":{"-":{"Actions":{"$set":["Questionmark","5"],"$dec":"update_counter"}}}}}},{"_comment":"------ Explore the Compound and find ICA Agents -----","Id":"88921515-8ae2-4369-b089-623e60490f74","Category":"secondary","ObjectiveType":"custom","ForceShowOnLoadingScreen":false,"Activation":{"$eq":["$2a52744b-e290-43ce-9e18-115180d3d460","Completed"]},"ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfCompleted":{"Visible":false}},"OnInactive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Image":"images/contracts/fox/Fox_Search_The_Compound.jpg","BriefingName":"$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_TITLE","BriefingText":"$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_HEADER","LongBriefingText":"$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_TITLE","iconType":17},"Type":"statemachine","Definition":{"Context":{"Targets":[],"KilledTargets":0,"Active":true},"States":{"Start":{"FoxTargetIdentification":[{"Actions":{"$pushunique":["Targets","$Value.RepositoryId"]}},{"Condition":{"$gt":["($.Targets).Count","$.KilledTargets"]},"Transition":"Success"}],"Kill":[{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$inc":"KilledTargets"}},{"Condition":{"$eq":["$.KilledTargets",5]},"Transition":"Success"}]},"Success":{"Kill":[{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$inc":"KilledTargets"}},{"Condition":{"$eq":["$.KilledTargets",5]},"Actions":{"$set":["Active",false]}},{"Condition":{"$and":[{"$le":["($.Targets).Count","$.KilledTargets"]},{"$eq":["$.Active",true]}]},"Transition":"Start"}],"FoxTargetIdentification":{"Actions":{"$pushunique":["Targets","$Value.RepositoryId"]}}}}}},{"_comment":"----- Invisible Seconday: Eliminate Lesser Agents. Allow us to kill stragglers -----","Id":"7e74ccd4-5070-4bfd-b9b0-b7fe5ecb8ab9","Category":"secondary","IsHidden":true,"ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Activation":{"$or":[{"$eq":["$47de2b7d-eae7-4d60-9987-154078ff11e9","Completed"]},{"$eq":["$11d9655f-190c-4181-be5f-30cadd50dc3c","Completed"]}]},"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"Image":"images/contracts/whitespider/003_rabies/Rabies_Eliminate_Infected_Obj.jpg","BriefingName":"$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_TITLE","BriefingText":"$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_OBJ"},"Type":"statemachine","Scope":"hit","Definition":{"Context":{"Targets":["252428ca-3f8e-4477-b2b9-58f18cff3e44","abd1c0e7-e406-43bd-9185-419029c5bf3d","922deccd-7fb4-45d9-ae3d-2cf11915c403","b8e7e65b-587e-471b-894d-282cda6614d4","2ab07903-e958-4af6-b01c-b62058745ce1","28cb7e91-bf9c-46ee-a371-1bd1448f1994","633398ac-c4b4-4441-852d-ae6460172025","eb024a5e-9580-49dc-a519-bb92c886f3b1","1305c2e4-6394-4cfa-b873-22adbd0c9702","8b29da09-461f-44d7-9042-d4fde829b9f2","f83376a4-6e56-4f2a-8122-151b272108fd"],"RemainingTargetsCount":10},"States":{"Start":{"Kill":[{"Actions":{"$dec":"RemainingTargetsCount"},"Condition":{"$inarray":{"in":"$.Targets","?":{"$eq":["$.#","$Value.RepositoryId"]}}}},{"Condition":{"$eq":["$.RemainingTargetsCount",0]},"Transition":"Success"}]}}}}]
                case "LOCATION_WET_RAT":
                    return [{"_comment":"----- START VETTING HACK COUNTDOWN -----","Id":"5dc023cb-083f-49e5-8c42-1f0f47f56700","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"StartVettingTimer":{"Transition":"Failure"}}}}},{"Activation":{"$eq":["$5dc023cb-083f-49e5-8c42-1f0f47f56700","Failed"]},"_comment":"----- VETTING HACK PUZZLE -----","Id":"620db22d-ff0f-46d2-9c99-3fcca69c6586","Category":"secondary","ExcludeFromScoring":true,"OnActive":{"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"HUDTemplate":{"display":"$loc UI_CONTRACT_RAT_OBJ_VETTING"},"Type":"statemachine","Definition":{"Context":{},"States":{"Start":{"StartVettingTimer":{"Transition":"VettingTimer"}},"VettingTimer":{"VettingSuccessful":{"Transition":"Success"},"$timer":{"Condition":{"$after":57},"Transition":"Failure"}}}}},{"_comment":"Activates Data Core OPTIONAL Objectives","Id":"52e024e8-26b8-4cb2-8f17-93e649a33c95","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfFailed":{"Visible":false},"IfInProgress":{"Visible":false}},"Definition":{"Constants":{"Goal":2},"Context":{"Count":0},"States":{"Start":{"DefaultStartingLocation":{"Transition":"Failure"},"Kill":[{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$inc":"Count"}},{"Condition":{"$eq":["$.Count","$.Goal"]},"Transition":"Success"}]}}}},{"_comment":"Get Data [OPTIONAL]","Id":"851cfa2a-874d-4374-8f3e-74379ce429e6","Category":"secondary","Type":"statemachine","Activation":{"$eq":["$52e024e8-26b8-4cb2-8f17-93e649a33c95","Completed"]},"OnInactive":{"IfCompleted":{"State":"Completed","Visible":false},"IfInProgress":{"Visible":false}},"ExcludeFromScoring":true,"ObjectiveType":"setpiece","Image":"Images/Contracts/Rat/rat_objective.jpg","BriefingName":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_OPTIONAL","BriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC","LongBriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING","HUDTemplate":{"display":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_OPTIONAL","iconType":17},"Definition":{"Context":{"Targets":["f9c04811-11e8-464d-9222-d79a636cebf3"]},"States":{"Start":{"DataGot":{"Transition":"Success"}}}}},{"_comment":"Get Data - Primary - Invisible ","Id":"6a631726-5bd4-4e06-84a0-56c805c4ab92","Category":"primary","ExcludeFromScoring":true,"IsHidden":true,"IgnoreIfInactive":true,"Activation":{"$eq":["$8283ba19-13db-4f34-a27d-228a275a4f48","Completed"]},"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false}},"OnInactive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false}},"ObjectiveType":"custom","Image":"Images/Contracts/Rat/rat_objective.jpg","HUDTemplate":{"display":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03","iconType":17},"Type":"statemachine","Definition":{"Context":{"OneTime":true},"States":{"Start":{"-":{"Transition":"Success"}},"Active":{"DataGot":{"Actions":{"$set":["OneTime",false]},"Transition":"Success"}},"Success":{"DefaultStartingLocation":{"Condition":{"$eq":["$.OneTime",true]},"Transition":"Active"}}}}},{"_comment":"Activates Data Core Objectives","Id":"8283ba19-13db-4f34-a27d-228a275a4f48","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"Definition":{"Scope":"session","Context":{},"States":{"Start":{"DefaultStartingLocation":{"Transition":"Success"}}}}},{"_comment":"Get Data - No Targets Killed","Id":"c75bb683-781d-41aa-be06-264083a8d658","Category":"secondary","Type":"statemachine","Activation":{"$eq":["$8283ba19-13db-4f34-a27d-228a275a4f48","Completed"]},"OnActive":{"IfCompleted":{"Visible":false}},"OnInactive":{"IfCompleted":{"State":"Completed","Visible":false},"IfInProgress":{"Visible":false}},"ExcludeFromScoring":true,"ObjectiveType":"custom","Image":"Images/Contracts/Rat/rat_objective.jpg","BriefingName":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_UNAVAILABLE","BriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC","LongBriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING","HUDTemplate":{"display":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_01","iconType":17},"Definition":{"States":{"Start":{"Kill":{"Condition":{"$eq":["$Value.IsTarget",true]},"Transition":"Success"}}}}},{"_comment":"Get Data - 1 Targets Killed","Id":"6debc7f2-d4f8-4be5-88ce-e09af4821a78","Category":"secondary","Type":"statemachine","Activation":{"$eq":["$c75bb683-781d-41aa-be06-264083a8d658","$8283ba19-13db-4f34-a27d-228a275a4f48","Completed"]},"OnActive":{"IfCompleted":{"Visible":false}},"OnInactive":{"IfCompleted":{"State":"Completed","Visible":false},"IfInProgress":{"Visible":false}},"ExcludeFromScoring":true,"ObjectiveType":"custom","Image":"Images/Contracts/Rat/rat_objective.jpg","BriefingName":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_UNAVAILABLE","BriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC","LongBriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING","HUDTemplate":{"display":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_02","iconType":17},"Definition":{"Constants":{"Goal":2},"Context":{"Count":0},"States":{"Start":{"Kill":[{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$inc":"Count"}},{"Condition":{"$eq":["$.Count","$.Goal"]},"Transition":"Success"}]}}}},{"_comment":"Get Data - All Targets Killed","Id":"63c0b383-a72f-4591-95ce-453a0152863e","Category":"secondary","Type":"statemachine","Activation":{"$eq":["$8283ba19-13db-4f34-a27d-228a275a4f48","$6debc7f2-d4f8-4be5-88ce-e09af4821a78","Completed"]},"OnInactive":{"IfCompleted":{"State":"Completed","Visible":false},"IfInProgress":{"Visible":false}},"ExcludeFromScoring":true,"ObjectiveType":"setpiece","Image":"Images/Contracts/Rat/rat_objective.jpg","BriefingName":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03","BriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC","LongBriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING","HUDTemplate":{"display":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03","iconType":17},"Definition":{"Context":{"Targets":["f9c04811-11e8-464d-9222-d79a636cebf3"]},"States":{"Start":{"DataGot":{"Transition":"Success"}}}}},{"Id":"f4afd898-9270-4e3a-9a26-326172760a01","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"Definition":{"Scope":"session","Context":{},"States":{"Start":{"ShowDataObjectiveSecond":{"Transition":"Success"}}}}},{"_comment":"----- Get Data Second Playthrough -----","Id":"8281663a-3787-42ab-ada1-6048757529a4","Category":"secondary","ExcludeFromScoring":true,"OnInactive":{"IfCompleted":{"State":"Completed","Visible":false}},"Activation":{"$eq":["$f4afd898-9270-4e3a-9a26-326172760a01","Completed"]},"ObjectiveType":"custom","ForceShowOnLoadingScreen":false,"Image":"Images/Contracts/Rat/rat_objective.jpg","BriefingName":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_OPTIONAL_TITLE","BriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC","LongBriefingText":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING","HUDTemplate":{"display":"$loc UI_CONTRACT_RAT_OBJ_DATACORE_OPTIONAL_TITLE","iconType":17},"Type":"statemachine","Definition":{"States":{"Start":{"CompleteDataObjectiveSecond":{"Transition":"Success"}}}}}]
                case "LOCATION_ELEGANT_LLAMA":
                    return [{"_comment":"----- Find Diana Burnwood -----","Id":"fdd987fd-20e2-42f8-a28a-6420584be50c","Primary":true,"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"ExcludeFromScoring":true,"OnActive":{"IfCompleted":{"Visible":false}},"Image":"images/actors/Llama_Diana_Burnwood.jpg","BriefingName":"$loc UI_CONTRACT_LLAMA_DIANA_FIND_NAME","BriefingText":"$loc UI_CONTRACT_LLAMA_DIANA_FIND_OBJ","HUDTemplate":{"display":"$loc UI_CONTRACT_LLAMA_DIANA_FIND_NAME","iconType":17},"Type":"statemachine","Definition":{"display":{"iconType":17},"Scope":"session","States":{"Start":{"Diana_Fail":{"Transition":"Failure"},"Diana_Find_Completed":{"Transition":"Success"}}}}},{"_comment":"----- Do Not Eliminate Diana Burnwood -----","Id":"ffaa1229-2fd3-4a93-87ca-974122e2a25f","Primary":true,"Activation":{"$eq":["$fdd987fd-20e2-42f8-a28a-6420584be50c","Completed"]},"ObjectiveType":"custom","ForceShowOnLoadingScreen":true,"ExcludeFromScoring":true,"OnActive":{"IfCompleted":{"Visible":false}},"Image":"images/actors/Llama_Diana_Burnwood.jpg","BriefingName":"$loc UI_CONTRACT_LLAMA_DIANA_NAME","BriefingText":"$loc UI_CONTRACT_LLAMA_DIANA_NAME","HUDTemplate":{"display":"$loc UI_CONTRACT_LLAMA_DIANA_NAME","iconType":17},"Type":"statemachine","Definition":{"display":{"iconType":17},"Scope":"session","States":{"Start":{"Diana_Extract_Start":{"Transition":"Success"}}}}},{"_comment":"----- Do Not Eliminate Diana Burnwood Dummy -----","Id":"636aef3d-3c15-4a5f-882a-d04a19ebbc7c","Primary":true,"Activation":{"$eq":["$fdd987fd-20e2-42f8-a28a-6420584be50c","Completed"]},"ObjectiveType":"custom","ForceShowOnLoadingScreen":false,"ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Image":"images/actors/Llama_Diana_Burnwood.jpg","BriefingName":"$loc UI_CONTRACT_LLAMA_DIANA_NAME","BriefingText":"$loc UI_CONTRACT_LLAMA_DIANA_NAME","HUDTemplate":{"display":"$loc UI_CONTRACT_LLAMA_DIANA_NAME","iconType":17},"Type":"statemachine","Definition":{"display":{"iconType":17},"Scope":"session","States":{"Start":{"Diana_Fail":{"Transition":"Failure"}}}}},{"Id":"76c66acd-18d7-4f93-b74f-95a6bea515d8","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":true},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"DianaMurderStarted":{"Transition":"Failure"}}}}},{"Activation":{"$eq":["$76c66acd-18d7-4f93-b74f-95a6bea515d8","Failed"]},"HUDTemplate":{"display":"$loc UI_CONTRACT_LLAMA_TIMER_DIANAMURDER"},"Id":"f92b9623-6cb5-44cb-b9a2-bf483a3bfe1d","Scope":"session","Type":"statemachine","Category":"secondary","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":false}},"Definition":{"ContextListeners":{"Timeout":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_HAWK_TIMER_TIMED_OUT","data":[]}}}}},"Context":{"Timeout":1},"States":{"Start":{"BeginTimer":{"Transition":"TimerRunning"}},"TimerRunning":{"$timer":{"Condition":{"$after":600},"Actions":{"$dec":"Timeout"},"Transition":"Failure"},"EndTimer":{"Transition":"Failure"},"SuccessTimer":{"Transition":"Success"}}}}},{"_comment":"----- Dormant Laser Timer 1 -----","Id":"1420233f-fb30-4d9d-b8b3-bf97231e526b","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"LASER_TIMER_ACTIVATE":{"Transition":"Success"}}}}},{"Activation":{"$eq":["$1420233f-fb30-4d9d-b8b3-bf97231e526b","Completed"]},"HUDTemplate":{"display":"$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE"},"_comment":"----- LASER TIMER 1 -----","Id":"01d97de2-bb2a-42b7-93c1-ea29c60bfd9b","Scope":"session","Type":"statemachine","Category":"secondary","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":false}},"Definition":{"ContextListeners":{"Timeout":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_LLAMA_LASERTIMER1","data":[]}}}}},"Context":{"Timeout":1},"States":{"Start":{"LASER_TIMER_ON":{"Transition":"TimerRunning"}},"TimerRunning":{"$timer":{"Condition":{"$after":60},"Actions":{"$dec":"Timeout"},"Transition":"Failure"}}}}},{"_comment":"----- Dormant Laser Timer 2 -----","Id":"701a1d42-b317-4103-bd74-a01f19920eab","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"LASER_TIMER2_ACTIVATE":{"Transition":"Success"}}}}},{"Activation":{"$eq":["$701a1d42-b317-4103-bd74-a01f19920eab","Completed"]},"HUDTemplate":{"display":"$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE"},"_comment":"----- LASER TIMER 1 -----","Id":"d3098d33-247a-4849-8ce2-fb6b9a2850ed","Scope":"session","Type":"statemachine","Category":"secondary","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":false}},"Definition":{"ContextListeners":{"Timeout":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_LLAMA_LASERTIMER2","data":[]}}}}},"Context":{"Timeout":1},"States":{"Start":{"LASER_TIMER2_ON":{"Transition":"TimerRunning"}},"TimerRunning":{"$timer":{"Condition":{"$after":60},"Actions":{"$dec":"Timeout"},"Transition":"Failure"}}}}},{"_comment":"----- Dormant Laser Timer 3 -----","Id":"0662c9ff-dee3-44cf-ab2b-761eb970936a","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":false},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"LASER_TIMER3_ACTIVATE":{"Transition":"Success"}}}}},{"Activation":{"$eq":["$0662c9ff-dee3-44cf-ab2b-761eb970936a","Completed"]},"HUDTemplate":{"display":"$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE"},"_comment":"----- LASER TIMER 3 -----","Id":"c3e9ad3e-b913-4d7d-85ad-ad538141778c","Scope":"session","Type":"statemachine","Category":"secondary","ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfFailed":{"Visible":false},"IfCompleted":{"Visible":false}},"Definition":{"ContextListeners":{"Timeout":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_LLAMA_LASERTIMER3","data":[]}}}}},"Context":{"Timeout":1},"States":{"Start":{"LASER_TIMER3_ON":{"Transition":"TimerRunning"}},"TimerRunning":{"$timer":{"Condition":{"$after":60},"Actions":{"$dec":"Timeout"},"Transition":"Failure"}}}}}]
                case "LOCATION_TRAPPED_WOLVERINE":
                    return [{"_comment":"-----UI text objective for Eliminate any Providence NPC -----","Id":"efb1da8a-c282-4b6f-bc1a-7efea39e1421","Category":"secondary","Activation":{"$eq":["$c458f79e-f308-49d9-8491-854e04aaeecb","Completed"]},"ExcludeFromScoring":true,"OnActive":{"IfInProgress":{"Visible":true},"IfCompleted":{"Visible":false},"IfFailed":{"Visible":false}},"ObjectiveType":"custom","Type":"statemachine","Scope":"session","Image":"images/contracts/wolverine/wolverine_providence_logo_obj.jpg","BriefingName":"$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_TITLE","BriefingText":"$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_HEADER","LongBriefingText":"$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_DESC","HUDTemplate":{"display":"$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_TITLE","iconType":17},"Definition":{"Scope":"session","Context":{},"States":{"Start":{"RemoveOptionalObjective":[{"Transition":"Success"}]}}}},{"_comment":"----- Objective hider -----","Id":"c458f79e-f308-49d9-8491-854e04aaeecb","Type":"statemachine","Category":"condition","ExcludeFromScoring":true,"Definition":{"Scope":"session","Context":{},"States":{"Start":{"EnableObjective":{"Transition":"Success"}}}}}]
                case "LOCATION_ROCKY_DUGONG":
                    return [{"_comment":"----- Get McGuffin OR destroy satellite link -----","Id":"3a71e4b6-6de1-4cc7-8e21-02970fdb1b3a","UpdateActivationWhileCompleted":true,"Category":"primary","Primary":true,"ObjectiveType":"custom","ExcludeFromScoring":true,"ForceShowOnLoadingScreen":true,"Image":"images/actors/Rocky_Destroy_McGuffin.jpg","BriefingName":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_TITLE","BriefingText":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_DESC","LongBriefingText":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_BRIEFING","HUDTemplate":{"display":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_TITLE","iconType":17},"Type":"statemachine","Scope":"session","Definition":{"ContextListeners":{"update_counter":{"type":"custom","HUDTemplate":{"display":{"$loc":{"key":"UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_DYNAMIC","data":["$.Core","$.Disks"]}},"iconType":17}}},"Context":{"Core":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROY","Disks":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_0","Core_Get":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROY","Core_Got":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROYED","Disk_0":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_0","Disk_1":"$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_1","PieceCounter":0,"update_counter":0},"States":{"Start":{"-":{"Actions":{"$inc":"update_counter"}},"KeyPieceFound":{"Actions":{"$inc":"PieceCounter"},"Transition":"DiskText"},"McGuffinDestroyedEvent":{"Actions":{"$set":["Core","$.Core_Got"]},"Transition":"Success"}},"DiskText":{"-":[{"Condition":{"$eq":["$.PieceCounter",0]},"Actions":{"$set":["Disks","$.Disk_0"]}},{"Condition":{"$eq":["$.PieceCounter",1]},"Actions":{"$set":["Disks","$.Disk_1"]}},{"Condition":{"$eq":["$.PieceCounter",2]},"Actions":{"$set":["Core",""]},"Transition":"Success"},{"Actions":{"$set":["Core","$.Core_Get"]},"Transition":"Start"}]},"Success":{"-":{"Actions":{"$set":["Disks",""],"$inc":"update_counter"}},"KeyPieceFound":[{"Actions":{"$inc":"PieceCounter"}},{"Condition":{"$eq":["$.PieceCounter",2]},"Transition":"DiskText"}]}}}},{"_comment":"----- Scoring Dummy for DataCore Objective -----","Id":"e4b13eee-c90d-40ef-9ced-720d0b209721","Category":"primary","Primary":true,"ObjectiveType":"custom","Image":"","BriefingName":"","BriefingText":"","Type":"statemachine","Scope":"session","Definition":{"States":{"Start":{"exit_gate":{"Transition":"Success"}}}}}]
            }
        }

        baseContract.Data.Objectives.push.apply(baseContract.Data.Objectives, additionalObjectives(selectedMission))

        controller.addMission(baseContract)

        ids.push(contractId)

        require("node:fs").writeFileSync("out.json", JSON.stringify(baseContract))
    })
}
