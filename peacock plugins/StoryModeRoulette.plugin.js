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
                    // do nothing
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
                    //
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
