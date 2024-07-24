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
        
        if (info.RouletteDifficulties.length != 0){
            baseContract.Data.GameDifficulties = info.RouletteDifficulties
        } 

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

        if (rouletteFilters.includes("rrBannedKills") && rouletteFilters.includes("specificFirearms")){
            killMethodPool.push("pistol_elimination")
            killMethodPool.push("weapon_elimination")
        }

        if (rouletteFilters.includes("rrBannedKills") && rouletteFilters.includes("specificFirearms") && (selectedMission != ("LOCATION_ICA_FACILITY_SHIP" || "LOCATION_ICA_FACILITY"))){
            killMethodPool.push("smg_elimination")
        }

        if ((selectedMission == "LOCATION_COLORADO" || "LOCATION_EDGY_FOX") && (rouletteFilters.includes("specificFirearms") && (!rouletteFilters.includes("specificMelee" || "specificAccidents")))){
            killMethodPool.push.apply(killMethodPool, specificAccidents)
            killMethodPool.push.apply(killMethodPool, info.RouletteMeleeWeapons)
            killMethodPool.push("fiberwire")
            killMethodPool.push("unarmed")
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

            for (let a = 0; a <= info.RouletteTargetNumber; a++) {
                if (!rouletteFilters.includes("rrBannedKills")&&((["052434e7-f451-462f-a9d7-13657cb047c0","edad702b-5b37-4dc1-a47c-36a1588f1d3f","0dfaea51-3c36-4722-9eff-f1e7ef139878","94ab740b-b30f-4086-9aea-5c9c0de28456","ee3f55b8-12f8-4245-8ef2-3022b4f6f120","f65fff84-6cad-4a11-9a0a-b89430c03397","963c2774-cb9a-4b0c-ab69-210b2405383b","ee454990-0c4b-49e5-9572-a67887325283","db21a429-add2-46fa-8176-540f846d89e0","076f23cc-09d8-423f-b890-74020f53b1d6","c7c9e213-16f9-4215-bf07-dd8f801ce3e0","672a7a52-a08a-45cd-a061-ced6a7b8d8c4","b8f0bf6c-4826-4de2-a785-2d139967e09c","67f39ab8-c25f-48c3-84be-0ec495a553ec","ad93e268-3d6e-4aba-bec0-607cb5451ac7","7504b78e-e766-42fe-930c-c5640f5f507b","0afcc59e-6d6e-433f-8404-7699df872c9d","5bc06fb1-bfb3-48ef-94ae-6f18c16c1eee","bd0689d6-07b4-4757-b8ee-cac19f1c9e16","9571d196-8d67-4d94-8dad-6e2d970d7a91","080efb03-a66a-401e-b6df-4eac496e9e2d","967abcf9-2672-4e81-8fef-211aaa366747","a7fd7a4f-2bee-4787-bc60-90f9dd64233b","57907f04-329e-4faf-b753-7e95d5c2e085","651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"].includes(info.RouletteTargetIds[a])&&selectedKillMethodList[a]=="accident_burn")||(["0dfaea51-3c36-4722-9eff-f1e7ef139878","5b54d9fb-fa85-4302-a8d5-c5c5e97344c4","1a8a827f-932e-49c0-a1b3-e3201795ae19","00df867e-f27f-4904-8bc7-9504443ccb5a","78f98c70-b7be-4578-9b6a-1c96a3e1ff1a","c7c9e213-16f9-4215-bf07-dd8f801ce3e0","7eb39f2d-1030-44d2-be82-6df608085ec0","67f39ab8-c25f-48c3-84be-0ec495a553ec","7504b78e-e766-42fe-930c-c5640f5f507b","0afcc59e-6d6e-433f-8404-7699df872c9d","bd0689d6-07b4-4757-b8ee-cac19f1c9e16","9571d196-8d67-4d94-8dad-6e2d970d7a91","967abcf9-2672-4e81-8fef-211aaa366747","a7fd7a4f-2bee-4787-bc60-90f9dd64233b","57907f04-329e-4faf-b753-7e95d5c2e085","651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"].includes(info.RouletteTargetIds[a])&&selectedKillMethodList[a]=="consumed_poison")||(["b38b0b62-8071-4761-b2a5-2f635cd8da1b","5b54d9fb-fa85-4302-a8d5-c5c5e97344c4","963c2774-cb9a-4b0c-ab69-210b2405383b","1a8a827f-932e-49c0-a1b3-e3201795ae19","d94f3e83-36e3-453c-8d4b-28c93229826a","076f23cc-09d8-423f-b890-74020f53b1d6","78f98c70-b7be-4578-9b6a-1c96a3e1ff1a","c7c9e213-16f9-4215-bf07-dd8f801ce3e0"].includes(info.RouletteTargetIds[a])&&selectedKillMethodList[a]=="accident_drown")||(["b38b0b62-8071-4761-b2a5-2f635cd8da1b","1a8a827f-932e-49c0-a1b3-e3201795ae19"].includes(info.RouletteTargetIds[a])&&selectedKillMethodList[a]=="accident_electric")||(["00df867e-f27f-4904-8bc7-9504443ccb5a","b87b242e-4ef4-42d8-94ed-17cbfc9009bf","db21a429-add2-46fa-8176-540f846d89e0","7eb39f2d-1030-44d2-be82-6df608085ec0","67f39ab8-c25f-48c3-84be-0ec495a553ec"].includes(info.RouletteTargetIds[a])&&selectedKillMethodList[a]=="b2321154-4520-4911-9d94-9256b85e0983")||(["b87b242e-4ef4-42d8-94ed-17cbfc9009bf","672a7a52-a08a-45cd-a061-ced6a7b8d8c4","5bc06fb1-bfb3-48ef-94ae-6f18c16c1eee","a7fd7a4f-2bee-4787-bc60-90f9dd64233b","651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"].includes(info.RouletteTargetIds[a])&&selectedKillMethodList[a]=="accident_suspended_object")||(["672a7a52-a08a-45cd-a061-ced6a7b8d8c4","b8f0bf6c-4826-4de2-a785-2d139967e09c"].includes(info.RouletteTargetIds[a])&&selectedKillMethodList[a]=="b153112f-9cd1-4a49-a9c6-ba1a34f443ab")||(["672a7a52-a08a-45cd-a061-ced6a7b8d8c4","b8f0bf6c-4826-4de2-a785-2d139967e09c"].includes(info.RouletteTargetIds[a])&&selectedKillMethodList[a]=="58dceb1c-d7db-41dc-9750-55e3ab87fdf0")||(info.RouletteTargetIds[a]=="9571d196-8d67-4d94-8dad-6e2d970d7a91"&&selectedKillMethodList[a]=="accident_drown"&&selectedDisguiseList[a]=="c4146f27-81a9-42ef-b3c7-87a9d60b87fe")||(info.RouletteTargetIds[a]=="ca31c88f-d15e-407b-8407-231f1b068402"&&!["accident_explosion","accident_electric","remote_explosive","accident_burn","consumed_poison"].includes(selectedKillMethodList[a])&&selectedDisguiseList[a]=="fdb4aade-4d5f-47e2-896f-fc1addf64d52")||(["ee3f55b8-12f8-4245-8ef2-3022b4f6f120","f65fff84-6cad-4a11-9a0a-b89430c03397"].includes(info.RouletteTargetIds[a])&&!["accident_explosion","accident_electric","remote_explosive","accident_burn","consumed_poison"].includes(selectedKillMethodList[a])&&selectedDisguiseList[a]=="c5bf909f-66a5-4f19-9aee-aeb953172e45")||(["7eb39f2d-1030-44d2-be82-6df608085ec0","67f39ab8-c25f-48c3-84be-0ec495a553ec"].includes(info.RouletteTargetIds[a])&&!["accident_explosion","accident_electric","remote_explosive","accident_burn","consumed_poison"].includes(selectedKillMethodList[a])&&selectedDisguiseList[a]=="fae73e92-2307-4163-8e9f-30401ca884bf"))){
                    otherBannedConditions = true
            }
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
            else if ((selectedKillMethodList[e] == "fiberwire") || (selectedKillMethodList[e] == "unarmed") || basic.includes(selectedKillMethodList[e], 0)){
                killMethodObjectiveCondition = {"$eq":["$Value.KillMethodBroad",selectedKillMethodList[e]]}
            }
            else if ((specificAccidents.includes(selectedKillMethodList[e], 0) && (!["impact_explosive", "remote_explosive", "loud_explosive", "accident_burn"].includes(selectedKillMethodList[e]))) || ((selectedKillMethodList[e] == "accident_burn") && (!["LOCATION_COASTALTOWN", "LOCATION_COASTALTOWN_MOVIESET", "LOCATION_COASTALTOWN_NIGHT", "LOCATION_COASTALTOWN_EBOLA", "LOCATION_THEENFORCER", "LOCATION_HOKKAIDO", "LOCATION_THECONTROLLER", "LOCATION_HOKKAIDO_MAMUSHI", "LOCATION_HOKKAIDO_FLU", "LOCATION_NORTHAMERICA", "LOCATION_NORTHAMERICA_GARTERSNAKE", "LOCATION_EDGY_FOX"].includes(selectedMission)))){
                killMethodObjectiveCondition = {"$eq":["$Value.KillMethodStrict",selectedKillMethodList[e]]}
            }
            else if ((selectedKillMethodList[e] == "accident_burn") && (["LOCATION_COASTALTOWN", "LOCATION_COASTALTOWN_MOVIESET", "LOCATION_COASTALTOWN_NIGHT", "LOCATION_COASTALTOWN_EBOLA", "LOCATION_THEENFORCER", "LOCATION_HOKKAIDO", "LOCATION_THECONTROLLER", "LOCATION_HOKKAIDO_MAMUSHI", "LOCATION_HOKKAIDO_FLU", "LOCATION_NORTHAMERICA", "LOCATION_NORTHAMERICA_GARTERSNAKE", "LOCATION_EDGY_FOX"].includes(selectedMission))){
                killMethodObjectiveCondition = {"$or":[{"$eq":["$Value.KillMethodStrict","accident_burn"]},{"$and":[{"$eq":["$Value.KillClass","unknown"]},{"$inarray":{"in":"$Value.DamageEvents","?":{"$eq":["$.#","InCloset"]}}}]}]}
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
            else if (selectedKillMethodList[e] == "impact_explosive"){
                killMethodObjectiveCondition = {"$and":[{"$inarray":{"?":{"$eq":["$.#","$Value.KillItemRepositoryId"]},"in":["2a493cf9-7cb1-4aad-b892-17abf8b329f4","485f8902-b7e3-4916-8b90-ea7cebb305de","c95c55aa-34e5-42bd-bf27-32be3978b269","af8a7b6c-692c-4a76-b9bc-2b91ce32bcbc","c82fefa7-febe-46c8-90ec-c945fbef0cb4","a83349bf-3d9c-43ec-92ee-c8c98cbeabc1"]}},{"$eq":["$Value.KillMethodBroad","explosive"]}]}
            }
            else if (selectedKillMethodList[e] == "remote_explosive"){
                killMethodObjectiveCondition = {"$and":[{"$not":{"$inarray":{"?":{"$eq":["$.#","$Value.KillItemRepositoryId"]},"in":["2a493cf9-7cb1-4aad-b892-17abf8b329f4","485f8902-b7e3-4916-8b90-ea7cebb305de","c95c55aa-34e5-42bd-bf27-32be3978b269","af8a7b6c-692c-4a76-b9bc-2b91ce32bcbc","c82fefa7-febe-46c8-90ec-c945fbef0cb4","a83349bf-3d9c-43ec-92ee-c8c98cbeabc1"]}}},{"$eq":["$Value.KillMethodBroad","explosive"]}]}
            }
            else if (selectedKillMethodList[e] == "loud_explosive"){
                killMethodObjectiveCondition = {"$and":[{"$not":{"$inarray":{"?":{"$eq":["$.#","$Value.KillItemRepositoryId"]},"in":["fc715a9a-3bf1-4768-bd67-0def61b92551","9d5daae3-10c8-4f03-a85d-9bd92861a672","293af6cc-dd8d-4641-b650-14cdfd00f1de"]}}},{"$eq":["$Value.KillMethodBroad","explosive"]}]}
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
            else if (!specificAccidents.includes(selectedKillMethodList[e])) {
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

        if (selectedMission == "LOCATION_ICA_FACILITY_SHIP") {
            baseContract.Data.MandatoryLoadout = [{"Id":"FIREARMS_HERO_PISTOL_TACTICAL_ICA_19","Properties":{"LoadoutSlot":"concealedweapon","RepositoryId":"73875794-5a86-410e-84a4-1b5b2f7e5a54"}},{"Id":"Melee_FiberWire_Descriptor","Properties":{"LoadoutSlot":"gear","RepositoryId":"1a11a060-358c-4054-98ec-d3491af1d7c6"}}]
        }
        else if (selectedMission == "LOCATION_ICA_FACILITY"){
            baseContract.Data.MandatoryLoadout = [{"Id":"FIREARMS_HERO_PISTOL_TACTICAL_ICA_19","Properties":{"LoadoutSlot":"concealedweapon","RepositoryId":"73875794-5a86-410e-84a4-1b5b2f7e5a54"}},{"Id":"Melee_FiberWire_Descriptor","Properties":{"LoadoutSlot":"gear","RepositoryId":"1a11a060-358c-4054-98ec-d3491af1d7c6"}},{"Id":"Tool_Coin","Properties":{"LoadoutSlot":"gear","RepositoryId":"dda002e9-02b1-4208-82a5-cf059f3c79cf"}},{"Id":"Tool_Coin","Properties":{"LoadoutSlot":"gear","RepositoryId":"dda002e9-02b1-4208-82a5-cf059f3c79cf"}},{"Id":"Tool_Coin","Properties":{"LoadoutSlot":"gear","RepositoryId":"dda002e9-02b1-4208-82a5-cf059f3c79cf"}},{"Id":"Tool_Coin","Properties":{"LoadoutSlot":"gear","RepositoryId":"dda002e9-02b1-4208-82a5-cf059f3c79cf"}},{"Id":"Tool_Coin","Properties":{"LoadoutSlot":"gear","RepositoryId":"dda002e9-02b1-4208-82a5-cf059f3c79cf"}}]
        }

        controller.addMission(baseContract)

        ids.push(contractId)

        require("node:fs").writeFileSync("out.json", JSON.stringify(baseContract))
    })
}
