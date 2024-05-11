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

        if(rouletteFilters.includes("rrBannedKills")){
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

            mainObjective.TargetConditions.push(mainObjectiveKillMethodCondition)

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

                mainObjective.TargetConditions.push(mainObjectiveDisguiseCondition)

                let disguiseObjective 

                if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7"){
                    disguiseObjective = {"Type":"statemachine","Id":disguiseObjectiveId,"BriefingText":"","category":"primary","Definition":{"Scope":"Hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"-":{"Actions":{"$pushunique":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"],"$remove":["Targets",info.RouletteTargetIds[e]]}},"SierraLeftCar":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Pre_Kill":{"Actions":{"$pushunique":["Targets",info.RouletteTargetIds[e]],"$remove":["Targets","af77ead8-72d4-461c-adb8-dd55146d029f"]}},"Kill":[{"Condition":{"$and":[disguiseObjectiveCondition,{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]}]},"Transition":"Success"},{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Failure"}]}}}}
                }
                else {
                    disguiseObjective = {"Type":"statemachine","Id":disguiseObjectiveId,"BriefingText":"","category":"primary","Definition":{"Scope":"Hit","Context":{"Targets":[info.RouletteTargetIds[e]]},"States":{"Start":{"Kill":[{"Condition":{"$and":[disguiseObjectiveCondition,{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]}]},"Transition":"Success"},{"Condition":{"$eq":["$Value.RepositoryId",info.RouletteTargetIds[e]]},"Transition":"Failure"}]}}}}
                }

                baseContract.Data.Objectives.push(disguiseObjective)
            }

            baseContract.Data.Objectives.push(mainObjective)
            baseContract.Data.Objectives.push(killMethodObjective)
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
