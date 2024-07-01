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
        baseContract.Metadata.BriefingVideo = info.RouletteBriefingVideo
        baseContract.Metadata.DebriefingVideo = info.RouletteDebriefingVideo
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
