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

        const baseContract = {"Data":{"Objectives":[],"Bricks":[],"VR":[],"GameChangers":[]},"Metadata":{"CreatorUserId":"fadb923c-e6bb-4283-a537-eb4d1150262e","IsPublished":true,"TileImage":"roulettetitleimage","BriefingVideo":"roulettebriefing","DebriefingVideo":"roulettedebriefing","Location":"roulettelocation","Title":"roulettetitle","ScenePath":"roulettescenepath","Description":"roulettedescription","Id":"rouletteid","CreationTimestamp":"2000-01-01T00:00:00Z","LastUpdate":"2000-01-01T00:00:00Z","Type":"bulletdancer","Release":"1.0.x","Entitlements":["rouletteentitlements"],"PublicId":"696969696969"},"UserData":{}}

        baseContract.Data.GameChangers = ["270e1adc-06d2-4680-b7c7-53c2599074b5"]
        baseContract.Metadata.Location = info.RouletteLocation
        baseContract.Metadata.Title = info.RouletteTitle
        baseContract.Metadata.ScenePath = info.RouletteScenePath
        baseContract.Metadata.Description = info.RouletteDescription
        baseContract.Metadata.TileImage = info.RouletteTileImage
        baseContract.Metadata.Id = contractId
        baseContract.Metadata.Entitlements = info.RouletteEntitlements
        baseContract.Data.Bricks = info.RouletteBricks
        baseContract.Data.VR = info.RouletteVrBricks

        if (info.RouletteEntrances.length != 0){
            baseContract.Data.Entrances = info.RouletteEntrances
        }
        if ((info.RouletteStashpoints.length != 0) || (selectedMission == "LOCATION_TRAPPED_WOLVERINE")){
            baseContract.Data.Stashpoints = info.RouletteStashpoints
        }
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
        const pacificationNumber = [1, 2, 3, 4]

        let bannedConditions = true

        function notMultipleLargeFirearms(array){
            const largeFirearms = ["loud_smg", "assaultrifle", "loud_assaultrifle", "silenced_assaultrifle", "shotgun", "loud_shotgun", "silenced_shotgun", "sniperrifle", "loud_sniperrifle", "silenced_sniperrifle"]
            let largeFirearmCount = 0

            for (let i = 0; i < array.length; i++){
                const testedForLargeFirearm = array[i]
                if (largeFirearms.includes(testedForLargeFirearm)){
                    largeFirearmCount++
                    if (largeFirearmCount > 1){
                        return false
                    }
                }
            }
            return true
        }

        function notMultiplePistols(array){
            const pistols = ["pistol", "silenced_pistol", "loud_pistol", "pistol_elimination", "weapon_elimination"]
            let pistolCount = 0

            for (let o = 0; o < array.length; o++){
                const testedForPistol = array[o]
                if (pistols.includes(testedForPistol)){
                    pistolCount++
                    if (pistolCount > 1){
                        return false
                    }
                }
            }
            return true
        }

        function notMultipleSmgs(array){
            const smgs = ["smg", "silenced_smg", "loud_smg", "smg_elimination", "weapon_elimination"]
            let smgCount = 0

            for (let u = 0; u < array.length; u++){
                const testedForSmg = array[u]
                if (smgs.includes(testedForSmg)){
                    smgCount++
                    if (smgCount > 1){
                        return false
                    }
                }
            }
            return true
        }

        function noOtherDuplicates(array){
            const uniqueKillMethods = new Set(array)
            if (uniqueKillMethods.size != array.length){
                uniqueKillMethods.clear()
                return false
            }
            return true
        }

        while (bannedConditions){
            selectedKillMethodList.length = 0
            selectedDisguiseList.length = 0

            for (let a = 0; a <= info.RouletteTargetNumber; a++){
                const selectedKillMethod = killMethodPool[getRandomIntWithSeed( 0, killMethodPool.length-1, seed++)]
                const selectedDisguise = disguisePool[getRandomIntWithSeed( 0, disguisePool.length-1, seed++)]
                selectedKillMethodList.push(selectedKillMethod)
                selectedDisguiseList.push(selectedDisguise)
            }

            let otherBannedConditions = false

            if (!rouletteFilters.includes("rrBannedKills") & (["LOCATION_PARIS", "LOCATION_COASTALTOWN", "LOCATION_BANGKOK", "LOCATION_HOKKAIDO", "LOCATION_MUMBAI", "LOCATION_NORTHAMERICA", "LOCATION_GREEDY_RACCOON", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_ANCESTRAL_BULLDOG", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[0] == "accident_burn")) || (["LOCATION_PARIS", "LOCATION_COASTALTOWN", "LOCATION_BANGKOK", "LOCATION_COLORADO", "LOCATION_MIAMI", "LOCATION_NORTHAMERICA", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "accident_burn")) || (["LOCATION_MUMBAI", "LOCATION_OPULENT_STINGRAY"].includes(selectedMission) && (selectedKillMethodList[2] == "accident_burn")) || (["LOCATION_COASTALTOWN", "LOCATION_COLORADO", "LOCATION_COLOMBIA", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA",].includes(selectedMission) && (selectedKillMethodList[0] == "consumed_poison")) || (["LOCATION_MUMBAI", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "consumed_poison")) || (["LOCATION_COLORADO", "LOCATION_MUMBAI"].includes(selectedMission) && (selectedKillMethodList[2] == "consumed_poison")) || (["LOCATION_COLORADO", "LOCATION_MUMBAI"].includes(selectedMission) && selectedKillMethodList.includes("accident_drown") || ((selectedMission == "LOCATION_MARRAKECH") && (selectedKillMethodList[1] == "accident_drown")) || ((selectedDisguiseList[1] == "c4146f27-81a9-42ef-b3c7-87a9d60b87fe") && (selectedKillMethodList[1] == "accident_drown")) || (["LOCATION_MARRAKECH", "LOCATION_NORTHAMERICA"].includes(selectedMission) && (selectedKillMethodList[0] == "accident_suspended_object")) || (["LOCATION_COLOMBIA", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "accident_suspended_object")) || ((selectedMission == "LOCATION_OPULENT_STINGRAY") && (selectedKillMethodList[2] == "accident_suspended_object")) || (["LOCATION_COLOMBIA", "LOCATION_NORTHSEA"].includes(selectedMission) && selectedKillMethodList.includes("b2321154-4520-4911-9d94-9256b85e0983")) || ((selectedMission == "LOCATION_NORTHAMERICA") && (["58dceb1c-d7db-41dc-9750-55e3ab87fdf0", "b153112f-9cd1-4a49-a9c6-ba1a34f443ab"].includes(selectedKillMethodList[0]) || (["58dceb1c-d7db-41dc-9750-55e3ab87fdf0", "b153112f-9cd1-4a49-a9c6-ba1a34f443ab"].includes(selectedKillMethodList[1]))) || ((selectedMission == "LOCATION_MARRAKECH") && (selectedKillMethodList[1] == "accident_electric")) || ((selectedMission == "LOCATION_COLORADO") && (selectedKillMethodList[2] == "accident_electric"))))){
                    otherBannedConditions = true
            }

            log(LogLevel.INFO, "Selected Kill Methods: ", selectedKillMethodList)
            log(LogLevel.INFO, "notMultipleLargeFirearms: ", notMultipleLargeFirearms(selectedKillMethodList))
            log(LogLevel.INFO, "notMultiplePistols: ", notMultiplePistols(selectedKillMethodList))
            log(LogLevel.INFO, "notMultipleSmgs: ", notMultipleSmgs(selectedKillMethodList))
            log(LogLevel.INFO, "noOtherDuplicates: ", noOtherDuplicates(selectedKillMethodList))
            log(LogLevel.INFO, "[Story Mode Roulette] Other banned conditions: " + otherBannedConditions)

            if (notMultipleLargeFirearms(selectedKillMethodList) && notMultiplePistols(selectedKillMethodList) && notMultipleSmgs(selectedKillMethodList) && noOtherDuplicates(selectedKillMethodList) && (otherBannedConditions == false)){
                bannedConditions = false
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

            let pacificationBanned

            if ((["5b54d9fb-fa85-4302-a8d5-c5c5e97344c4", "963c2774-cb9a-4b0c-ab69-210b2405383b", "076f23cc-09d8-423f-b890-74020f53b1d6", "78f98c70-b7be-4578-9b6a-1c96a3e1ff1a", "c7c9e213-16f9-4215-bf07-dd8f801ce3e0", "967abcf9-2672-4e81-8fef-211aaa366747"].includes(info.RouletteTargetIds[e])) && ((selectedKillMethodList[e] == ("loud_pistol" || "loud_smg")) || (loud.includes(selectedKillMethodList[e])))){
                pacificationBanned = true
            }
            else {
                pacificationBanned = false
            }

            if (!(rouletteFilters.includes("rrBannedKills")) && (pacificationBanned == true)){
                // do fucking nothing
            }
            else {
                const selectedPacificationNumber = pacificationNumber[getRandomIntWithSeed( 0, pacificationNumber.length-1, seed++)]
                if (selectedPacificationNumber == "4"){
                    const pacificationObjectiveId = randomUUID()
                    const pacificationObjective = {"Type":"statemachine","Id":pacificationObjectiveId,"ObjectiveType":"setpiece","Image":"images/contracts/gamechangers/gamechanger_global_nopacifications.jpg","BriefingName":"balls","BriefingText":"balls","LongBriefingText":"balls","Category":"primary","HUDTemplate":{"display":"balls","iconType":7},"Definition":{"display":{"iconType":7},"Scope":"session","States":{"Start":{"Pacify":{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Failure"},"Kill":{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Success"}}}}}
                    baseContract.Data.Objectives.push(pacificationObjective)
                }
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
