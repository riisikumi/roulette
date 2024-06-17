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
