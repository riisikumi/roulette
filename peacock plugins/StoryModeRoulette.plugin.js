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
        baseContract.Metadata.Location = selectedMission
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

        if (rouletteFilters.includes("specificFirearms", 0)){
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

        if ((rouletteFilters.includes("specificMelee", 0)) && (info.RouletteMeleeWeapons != [""])){
            killMethodPool.push.apply(killMethodPool, info.RouletteMeleeWeapons)
            killMethodPool.push("fiberwire")
            killMethodPool.push("unarmed")
            log(LogLevel.INFO, killMethodPool)
        }

        if (rouletteFilters.includes("rrBannedKills")){
            killMethodPool.push("pistol_elimination")
            killMethodPool.push("smg_elimination")
            killMethodPool.push("weapon_elimination")
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

                    if ((["LOCATION_PARIS", "LOCATION_COASTALTOWN", "LOCATION_BANGKOK", "LOCATION_HOKKAIDO", "LOCATION_MUMBAI", "LOCATION_NORTHAMERICA", "LOCATION_GREEDY_RACCOON", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_ANCESTRAL_BULLDOG", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[0] == "accident_burn")) || (["LOCATION_PARIS", "LOCATION_COASTALTOWN", "LOCATION_BANGKOK", "LOCATION_COLORADO", "LOCATION_MIAMI", "LOCATION_NORTHAMERICA", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "accident_burn")) || (["LOCATION_MUMBAI", "LOCATION_OPULENT_STINGRAY"].includes(selectedMission) && (selectedKillMethodList[2] == "accident_burn")) || (["LOCATION_COASTALTOWN", "LOCATION_COLORADO", "LOCATION_COLOMBIA", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA",].includes(selectedMission) && (selectedKillMethodList[0] == "consumed_poison")) || (["LOCATION_MUMBAI", "LOCATION_NORTHSEA", "LOCATION_OPULENT_STINGRAY", "LOCATION_GOLDEN_GECKO", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "consumed_poison")) || (["LOCATION_COLORADO", "LOCATION_MUMBAI"].includes(selectedMission) && (selectedKillMethodList[2] == "consumed_poison")) || (["LOCATION_COLORADO", "LOCATION_MUMBAI"].includes(selectedMission) && selectedKillMethodList.includes("accident_drown") || ((selectedMission == "LOCATION_MARRAKECH") && (selectedKillMethodList[1] == "accident_drown")) || ((selectedDisguiseList[1] == "c4146f27-81a9-42ef-b3c7-87a9d60b87fe") && (selectedKillMethodList[1] == "accident_drown")) || (["LOCATION_MARRAKECH", "LOCATION_NORTHAMERICA"].includes(selectedMission) && (selectedKillMethodList[0] == "accident_suspended_object")) || (["LOCATION_COLOMBIA", "LOCATION_WET_RAT", "LOCATION_ELEGANT_LLAMA"].includes(selectedMission) && (selectedKillMethodList[1] == "accident_suspended_object")) || ((selectedMission == "LOCATION_OPULENT_STINGRAY") && (selectedKillMethodList[2] == "accident_suspended_object")) || (["LOCATION_COLOMBIA", "LOCATION_NORTHSEA"].includes(selectedMission) && selectedKillMethodList.includes("b2321154-4520-4911-9d94-9256b85e0983")) || ((selectedMission == "LOCATION_NORTHAMERICA") && ["58dceb1c-d7db-41dc-9750-55e3ab87fdf0", "b153112f-9cd1-4a49-a9c6-ba1a34f443ab"].includes(selectedKillMethodList[a])) || ((selectedMission == "LOCATION_MARRAKECH") && (selectedKillMethodList[1] == "accident_electric")) || ((selectedMission == "LOCATION_COLORADO") && (selectedKillMethodList[2] == "accident_electric"))))
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

        for (let e = 0; e <= info.RouletteTargetNumber; e++){
            const mainObjectiveId = randomUUID()
            const killMethodObjectiveId = randomUUID()
            const disguiseObjectiveId = randomUUID()

            let mainObjective

            if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7"){
                mainObjective = {"Category":"primary","Type":"statemachine","OnInactive":{"IfCompleted":{"State":"Completed","Visible":false}},"OnActive":{"IfCompleted":{"Visible":true}},"Definition":{"Scope":"hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"-":{"Actions":{"$pushunique":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"],"$remove":["Targets",info.RouletteTargetIds[e]]}},"SierraLeftCar":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Pre_Kill":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Kill":[{"Condition":{"$and":[{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]}]},"Transition":"Success"}]}}},"Id":mainObjectiveId,"HUDTemplate":{"display":"balls"},"BriefingText":"","LongBriefingText":"balls","TargetConditions":[]}
            }
            else if (["ballsack", "cunt", "asshole", "borisjohnson", "vladimirputin"].includes(info.RouletteTargetIds[e])){
                mainObjective = {"Category":"primary","ObjectiveType":"setpiece","Definition":{"ContextListeners":{"Failure":{"type":"custom","LongBriefingText":"balls"}},"Context":{"Targets":["252428ca-3f8e-4477-b2b9-58f18cff3e44"],"PossibleTargets":["252428ca-3f8e-4477-b2b9-58f18cff3e44","abd1c0e7-e406-43bd-9185-419029c5bf3d","922deccd-7fb4-45d9-ae3d-2cf11915c403","b8e7e65b-587e-471b-894d-282cda6614d4","2ab07903-e958-4af6-b01c-b62058745ce1","28cb7e91-bf9c-46ee-a371-1bd1448f1994","633398ac-c4b4-4441-852d-ae6460172025","eb024a5e-9580-49dc-a519-bb92c886f3b1","1305c2e4-6394-4cfa-b873-22adbd0c9702","f83376a4-6e56-4f2a-8122-151b272108fd","8b29da09-461f-44d7-9042-d4fde829b9f2"],"PacifiedTargets":[],"KilledTargets":0},"States":{"Start":{"Pacify":{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$pushunique":["PacifiedTargets","$Value.RepositoryId"]}},"Kill":[{"Condition":{"$eq":["$Value.IsTarget",true]},"Actions":{"$inc":"KilledTargets"}},{"Condition":{"$and":[{"$inarray":{"in":"$.PossibleTargets","?":{"$eq":["$.#","$Value.RepositoryId"]}}}]},"Transition":"Success"}]},"Success":{"Kill":[{"Condition":{"$and":[{"$inarray":{"in":"$.PossibleTargets","?":{"$eq":["$.#","$Value.RepositoryId"]}}},{"$lt":["$.KilledTargets",6]}]},"Transition":"Failure"}]}}},"Id":mainObjectiveId,"Image":"images/actors/ica-agents.png","BriefingName":"balls","BriefingText":"balls","LongBriefingText":"balls","HUDTemplate":{"display":"balls"}}
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
            }

            baseContract.Data.Objectives.push(mainObjective)
            if (selectedMission != "LOCATION_EDGY_FOX"){
                baseContract.Data.Objectives.push(killMethodObjective)
            }
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

        controller.addMission(baseContract)

        ids.push(contractId)

        require("node:fs").writeFileSync("out.json", JSON.stringify(baseContract))
    })
}
