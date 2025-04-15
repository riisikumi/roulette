const { log, LogLevel } = require("@peacockproject/core/loggingInterop")
const zlib = require("zlib")
const { Buffer } = require("buffer")
const randomUUID = require("crypto").randomUUID
var import_flags = require("@peacockproject/core/flags")
const { PEACOCKVERSTRING, compare } = require("@peacockproject/core/utils")
var RRAdditiveModifiersFlagSectionKey = "randomroulette"
function decompress(input) {
	return JSON.parse(zlib.brotliDecompressSync(Buffer.from(input, "base64")).toString())
}
xorshift = (t) => {
	let e = t
	return (e ^= e << 13), (e ^= e >> 17), (e ^= e << 5), e >>> 0
}
const getRandomIntWithSeed = (t, e, r) => {
	const n = xorshift(r),
		s = new MersenneTwister(n).random() / 4294967295
	return Math.floor(s * (e - t + 1)) + t
}

class MersenneTwister {
	constructor(t) {
		;(this.N = 624), (this.mt = new Array(this.N)), (this.index = 0), (this.mt[0] = t >>> 0)
		for (let t = 1; t < this.N; t++) this.mt[t] = (1812433253 * (this.mt[t - 1] ^ (this.mt[t - 1] >>> 30)) + t) >>> 0
	}
	random() {
		0 === this.index && this.generateNumbers()
		let t = this.mt[this.index]
		return (
			(t ^= t >>> 11),
			(t ^= (t << 7) & 2636928640),
			(t ^= (t << 15) & 4022730752),
			(t ^= t >>> 18),
			(this.index = (this.index + 1) % this.N),
			t >>> 0
		)
	}
	generateNumbers() {
		for (let t = 0; t < this.N; t++) {
			let e = (2147483648 & this.mt[t]) + (2147483647 & this.mt[(t + 1) % this.N])
			;(this.mt[t] = this.mt[(t + 397) % this.N] ^ (e >>> 1)), e % 2 != 0 && (this.mt[t] ^= 2567483615)
		}
	}
}

module.exports = function ContractSearch(controller) {
	if (compare(PEACOCKVERSTRING, "8.0.0-beta.2") < 0) {
		return
	}
	let seed = controller.transferseed
	controller.hooks.getSearchResults.tap("ContractSearchResults", async (parameters, ids) => {
		if (import_flags.getFlag(`${RRAdditiveModifiersFlagSectionKey}.contractgen`) === "true") {
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
									Visible: false
								}
							},
							AllowEtRestartOnSuccess: true,
							BriefingText: "$loc UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_RECORDINGS_PRIMARY_OBJ",
							HUDTemplate: {
								display: "$loc UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_RECORDINGS_PRIMARY_OBJ"
							},
							Type: "statemachine",
							Definition: {
								Scope: "session",
								Context: {},
								States: {
									Start: {
										"-": {
											Transition: "Success"
										}
									}
								}
							}
						}
					],
					ShowBasedOnObjectives: null,
					IsPrestigeObjective: null
				}
			}
			controller.configManager.configs.GameChangerProperties = Object.assign(
				{},
				controller.configManager.configs.GameChangerProperties,
				SeedGameChanger
			)
			for (const param of parameters) {
				// Get the key and value of the search parameter
				const criterion = param.split(";")
				if (criterion[0] === "OwnedLocation") {
					defaultMissionPool.push(criterion[1])
				} else if (criterion[0] === "Location") {
					selectedMissionPool.push(criterion[1])
				} else if (criterion[0] === "RouletteFilter") {
					rouletteFilters.push(criterion[1])
				}
			}

			if (selectedMissionPool.length == 0) {
				selectedMissionPool.push.apply(selectedMissionPool, defaultMissionPool)
			}

			if (rouletteFilters.length == 0) {
				rouletteFilters.push.apply(rouletteFilters, defaultRouletteFilters)
			}

			const badlocation = selectedMissionPool.indexOf("LOCATION_ANCESTRAL_SMOOTHSNAKE")

			if (badlocation !== -1) {
				selectedMissionPool.splice(badlocation, 1)
			}
			const selectedMission = selectedMissionPool[getRandomIntWithSeed(0, selectedMissionPool.length - 1, seed++)]

			const contractInfo = decompress(
				"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"
			)

			const info = contractInfo[selectedMission]

			log(LogLevel.INFO, "[Roulette] Selected mission:" + selectedMission)

			const baseContract = {
				Data: { Objectives: [], Bricks: [], VR: [], GameChangers: [] },
				Metadata: {
					CreatorUserId: "fadb923c-e6bb-4283-a537-eb4d1150262e",
					IsPublished: true,
					TileImage: "roulettetitleimage",
					BriefingVideo: "roulettebriefing",
					DebriefingVideo: "roulettedebriefing",
					Location: "roulettelocation",
					Title: "roulettetitle",
					ScenePath: "roulettescenepath",
					Description: "roulettedescription",
					Id: "rouletteid",
					CreationTimestamp: "2000-01-01T00:00:00Z",
					LastUpdate: "2000-01-01T00:00:00Z",
					Type: "bulletdancer",
					Release: "1.0.x",
					Entitlements: ["rouletteentitlements"],
					PublicId: "696969696969"
				},
				UserData: {}
			}

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

			if (info.RouletteEntrances.length != 0) {
				baseContract.Data.Entrances = info.RouletteEntrances
			}
			if (info.RouletteStashpoints.length != 0 || selectedMission == "LOCATION_TRAPPED_WOLVERINE") {
				baseContract.Data.Stashpoints = info.RouletteStashpoints
			}

			if (info.RouletteDifficulties.length != 0) {
				baseContract.Data.GameDifficulties = info.RouletteDifficulties
			}

			const killLocKeys = decompress(
				"G/MHYCwKbBtZL624D4UV9rJY6ewliEifzRlOe6dNlf9cCpwBrd3QTb3+nf9uYTUtAatiKysFFr9+bSWROv1CIXVCuTv2/iJeiSaVam8xT2ZRtDGURkxETOcompehhjJz9UBANvqUBtH7QrTi94de1BeqteXAwfJf+Fc1g9cr4xPKS8z1HvC35b+UCZow25FYTD+TIZDfuF/qXWyEvUP215YKQ4OqaYkNKfeToQGzpYvBM/1EBUTprJ+HSgZP/UXhXO/LrEWkqvXqxGAnBz2PUU8MydCALtqsY/XaHH9CPUZ+06Yaax9v0QreUp4ZFM4a3A8WpwVr75fTgUfDZw4NPqACfi6h4kOsEF9gASZM4SRnouIL0rEkfgCKBNggAXggEGuOfAtX+xP188B+j/MkiJwjY5kf4zC32pinkueG5X54ITeVFSWpMJIFo1hqP2rqXuYn28uFs2JlDCnlx1qd11qJplVW58S9/39X2qKXKAzeNlifAI/qFh1m6etQkyvU3OSHmiKhVPagS1xEWxxr/wMeWrePtzCZQ4rlKL/v/2Ij1e948JY/35XtXL8wgOIE7oO+CkvF6AK7mWyRMxyn1DTSyYEUq6o4drFneBAU32Ll/jlnLyYVNR1AEPtg564WFjU="
			)

			const killMethodPool = []
			const specificAccidents = [
				"accident_drown",
				"accident_explosion",
				"accident_push",
				"accident_suspended_object",
				"accident_electric",
				"accident_burn",
				"injected_poison",
				"consumed_poison",
				"remote_explosive",
				"impact_explosive",
				"loud_explosive"
			]
			const basic = ["assaultrifle", "shotgun", "sniperrifle"]
			const silenced = ["silenced_assaultrifle", "silenced_shotgun", "silenced_sniperrifle"]
			const loud = ["loud_assaultrifle", "loud_shotgun", "loud_sniperrifle"]

			if (rouletteFilters.includes("specificAccidents", 0)) {
				killMethodPool.push.apply(killMethodPool, specificAccidents)
			}

			if (
				rouletteFilters.includes("specificFirearms", 0) &&
				selectedMission != ("LOCATION_ICA_FACILITY_SHIP" || "LOCATION_ICA_FACILITY")
			) {
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

			if (rouletteFilters.includes("specificFirearms", 0) && selectedMission == "LOCATION_ICA_FACILITY") {
				killMethodPool.push("pistol")
				killMethodPool.push("loud_pistol")
				killMethodPool.push("silenced_pistol")
				killMethodPool.push("assaultrifle")
				killMethodPool.push("loud_assaultrifle")
			}

			if (rouletteFilters.includes("specificFirearms", 0) && selectedMission == "LOCATION_ICA_FACILITY_SHIP") {
				killMethodPool.push("pistol")
				killMethodPool.push("loud_pistol")
				killMethodPool.push("silenced_pistol")
				killMethodPool.push("assaultrifle")
				killMethodPool.push("loud_assaultrifle")
				killMethodPool.push("shotgun")
				killMethodPool.push("loud_shotgun")
			}

			if (rouletteFilters.includes("specificMelee", 0) && info.RouletteMeleeWeapons != [""]) {
				killMethodPool.push.apply(killMethodPool, info.RouletteMeleeWeapons)
				killMethodPool.push("fiberwire")
				killMethodPool.push("unarmed")
			}

			if (rouletteFilters.includes("rrBannedKills") && rouletteFilters.includes("specificFirearms")) {
				killMethodPool.push("pistol_elimination")
				killMethodPool.push("weapon_elimination")
			}

			if (
				rouletteFilters.includes("rrBannedKills") &&
				rouletteFilters.includes("specificFirearms") &&
				selectedMission != "LOCATION_ICA_FACILITY_SHIP" &&
				selectedMission != "LOCATION_ICA_FACILITY"
			) {
				killMethodPool.push("smg_elimination")
			}

			if (
				(selectedMission == "LOCATION_COLORADO" || selectedMission == "LOCATION_EDGY_FOX") &&
				rouletteFilters.includes("specificFirearms") &&
				!rouletteFilters.includes("specificMelee") &&
				!rouletteFilters.includes("specificAccidents")
			) {
				killMethodPool.push.apply(killMethodPool, specificAccidents)
				killMethodPool.push.apply(killMethodPool, info.RouletteMeleeWeapons)
				killMethodPool.push("fiberwire")
				killMethodPool.push("unarmed")
			}

			const disguisePool = info.RouletteDisguises

			const exitPool = info.RouletteExits

			// The following section randomizes kill methods and disguises

			const selectedKillMethodList = []
			const selectedDisguiseList = []
			const pacificationNumber = [1, 2, 3, 4]

			let bannedConditions = true

			function notMultipleLargeFirearms(array) {
				const largeFirearms = [
					"loud_smg",
					"assaultrifle",
					"loud_assaultrifle",
					"silenced_assaultrifle",
					"shotgun",
					"loud_shotgun",
					"silenced_shotgun",
					"sniperrifle",
					"loud_sniperrifle",
					"silenced_sniperrifle"
				]
				let largeFirearmCount = 0

				for (let i = 0; i < array.length; i++) {
					const testedForLargeFirearm = array[i]
					if (largeFirearms.includes(testedForLargeFirearm)) {
						largeFirearmCount++
						if (largeFirearmCount > 1) {
							return false
						}
					}
				}
				return true
			}

			function notMultiplePistols(array) {
				const pistols = ["pistol", "silenced_pistol", "loud_pistol", "pistol_elimination", "weapon_elimination"]
				let pistolCount = 0

				for (let o = 0; o < array.length; o++) {
					const testedForPistol = array[o]
					if (pistols.includes(testedForPistol)) {
						pistolCount++
						if (pistolCount > 1) {
							return false
						}
					}
				}
				return true
			}

			function notMultipleSmgs(array) {
				const smgs = ["smg", "silenced_smg", "loud_smg", "smg_elimination", "weapon_elimination"]
				let smgCount = 0

				for (let u = 0; u < array.length; u++) {
					const testedForSmg = array[u]
					if (smgs.includes(testedForSmg)) {
						smgCount++
						if (smgCount > 1) {
							return false
						}
					}
				}
				return true
			}

			function noOtherDuplicates(array) {
				const uniqueKillMethods = new Set(array)
				if (uniqueKillMethods.size != array.length) {
					uniqueKillMethods.clear()
					return false
				}
				return true
			}

			while (bannedConditions) {
				selectedKillMethodList.length = 0
				selectedDisguiseList.length = 0

				for (let a = 0; a <= info.RouletteTargetNumber; a++) {
					const selectedKillMethod = killMethodPool[getRandomIntWithSeed(0, killMethodPool.length - 1, seed++)]
					const selectedDisguise = disguisePool[getRandomIntWithSeed(0, disguisePool.length - 1, seed++)]
					selectedKillMethodList.push(selectedKillMethod)
					selectedDisguiseList.push(selectedDisguise)
				}

				let otherBannedConditions = false

				for (let a = 0; a <= info.RouletteTargetNumber; a++) {
					if (
						!rouletteFilters.includes("rrBannedKills") &&
						(([
							"052434e7-f451-462f-a9d7-13657cb047c0",
							"edad702b-5b37-4dc1-a47c-36a1588f1d3f",
							"0dfaea51-3c36-4722-9eff-f1e7ef139878",
							"94ab740b-b30f-4086-9aea-5c9c0de28456",
							"ee3f55b8-12f8-4245-8ef2-3022b4f6f120",
							"f65fff84-6cad-4a11-9a0a-b89430c03397",
							"963c2774-cb9a-4b0c-ab69-210b2405383b",
							"ee454990-0c4b-49e5-9572-a67887325283",
							"db21a429-add2-46fa-8176-540f846d89e0",
							"076f23cc-09d8-423f-b890-74020f53b1d6",
							"c7c9e213-16f9-4215-bf07-dd8f801ce3e0",
							"672a7a52-a08a-45cd-a061-ced6a7b8d8c4",
							"b8f0bf6c-4826-4de2-a785-2d139967e09c",
							"67f39ab8-c25f-48c3-84be-0ec495a553ec",
							"ad93e268-3d6e-4aba-bec0-607cb5451ac7",
							"7504b78e-e766-42fe-930c-c5640f5f507b",
							"0afcc59e-6d6e-433f-8404-7699df872c9d",
							"5bc06fb1-bfb3-48ef-94ae-6f18c16c1eee",
							"bd0689d6-07b4-4757-b8ee-cac19f1c9e16",
							"9571d196-8d67-4d94-8dad-6e2d970d7a91",
							"080efb03-a66a-401e-b6df-4eac496e9e2d",
							"967abcf9-2672-4e81-8fef-211aaa366747",
							"a7fd7a4f-2bee-4787-bc60-90f9dd64233b",
							"57907f04-329e-4faf-b753-7e95d5c2e085",
							"651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"
						].includes(info.RouletteTargetIds[a]) &&
							selectedKillMethodList[a] == "accident_burn") ||
							([
								"0dfaea51-3c36-4722-9eff-f1e7ef139878",
								"5b54d9fb-fa85-4302-a8d5-c5c5e97344c4",
								"1a8a827f-932e-49c0-a1b3-e3201795ae19",
								"00df867e-f27f-4904-8bc7-9504443ccb5a",
								"78f98c70-b7be-4578-9b6a-1c96a3e1ff1a",
								"c7c9e213-16f9-4215-bf07-dd8f801ce3e0",
								"7eb39f2d-1030-44d2-be82-6df608085ec0",
								"67f39ab8-c25f-48c3-84be-0ec495a553ec",
								"7504b78e-e766-42fe-930c-c5640f5f507b",
								"0afcc59e-6d6e-433f-8404-7699df872c9d",
								"bd0689d6-07b4-4757-b8ee-cac19f1c9e16",
								"9571d196-8d67-4d94-8dad-6e2d970d7a91",
								"967abcf9-2672-4e81-8fef-211aaa366747",
								"a7fd7a4f-2bee-4787-bc60-90f9dd64233b",
								"57907f04-329e-4faf-b753-7e95d5c2e085",
								"651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"
							].includes(info.RouletteTargetIds[a]) &&
								selectedKillMethodList[a] == "consumed_poison") ||
							([
								"b38b0b62-8071-4761-b2a5-2f635cd8da1b",
								"5b54d9fb-fa85-4302-a8d5-c5c5e97344c4",
								"963c2774-cb9a-4b0c-ab69-210b2405383b",
								"1a8a827f-932e-49c0-a1b3-e3201795ae19",
								"d94f3e83-36e3-453c-8d4b-28c93229826a",
								"076f23cc-09d8-423f-b890-74020f53b1d6",
								"78f98c70-b7be-4578-9b6a-1c96a3e1ff1a",
								"c7c9e213-16f9-4215-bf07-dd8f801ce3e0"
							].includes(info.RouletteTargetIds[a]) &&
								selectedKillMethodList[a] == "accident_drown") ||
							(["b38b0b62-8071-4761-b2a5-2f635cd8da1b", "1a8a827f-932e-49c0-a1b3-e3201795ae19"].includes(
								info.RouletteTargetIds[a]
							) &&
								selectedKillMethodList[a] == "accident_electric") ||
							([
								"00df867e-f27f-4904-8bc7-9504443ccb5a",
								"b87b242e-4ef4-42d8-94ed-17cbfc9009bf",
								"db21a429-add2-46fa-8176-540f846d89e0",
								"7eb39f2d-1030-44d2-be82-6df608085ec0",
								"67f39ab8-c25f-48c3-84be-0ec495a553ec"
							].includes(info.RouletteTargetIds[a]) &&
								selectedKillMethodList[a] == "b2321154-4520-4911-9d94-9256b85e0983") ||
							([
								"b87b242e-4ef4-42d8-94ed-17cbfc9009bf",
								"672a7a52-a08a-45cd-a061-ced6a7b8d8c4",
								"5bc06fb1-bfb3-48ef-94ae-6f18c16c1eee",
								"a7fd7a4f-2bee-4787-bc60-90f9dd64233b",
								"651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"
							].includes(info.RouletteTargetIds[a]) &&
								selectedKillMethodList[a] == "accident_suspended_object") ||
							(["672a7a52-a08a-45cd-a061-ced6a7b8d8c4", "b8f0bf6c-4826-4de2-a785-2d139967e09c"].includes(
								info.RouletteTargetIds[a]
							) &&
								selectedKillMethodList[a] == "b153112f-9cd1-4a49-a9c6-ba1a34f443ab") ||
							(["672a7a52-a08a-45cd-a061-ced6a7b8d8c4", "b8f0bf6c-4826-4de2-a785-2d139967e09c"].includes(
								info.RouletteTargetIds[a]
							) &&
								selectedKillMethodList[a] == "58dceb1c-d7db-41dc-9750-55e3ab87fdf0") ||
							(info.RouletteTargetIds[a] == "9571d196-8d67-4d94-8dad-6e2d970d7a91" &&
								selectedKillMethodList[a] == "accident_drown" &&
								selectedDisguiseList[a] == "c4146f27-81a9-42ef-b3c7-87a9d60b87fe") ||
							(info.RouletteTargetIds[a] == "ca31c88f-d15e-407b-8407-231f1b068402" &&
								![
									"accident_explosion",
									"accident_electric",
									"remote_explosive",
									"accident_burn",
									"consumed_poison"
								].includes(selectedKillMethodList[a]) &&
								selectedDisguiseList[a] == "fdb4aade-4d5f-47e2-896f-fc1addf64d52") ||
							(["ee3f55b8-12f8-4245-8ef2-3022b4f6f120", "f65fff84-6cad-4a11-9a0a-b89430c03397"].includes(
								info.RouletteTargetIds[a]
							) &&
								![
									"accident_explosion",
									"accident_electric",
									"remote_explosive",
									"accident_burn",
									"consumed_poison"
								].includes(selectedKillMethodList[a]) &&
								selectedDisguiseList[a] == "c5bf909f-66a5-4f19-9aee-aeb953172e45") ||
							(["7eb39f2d-1030-44d2-be82-6df608085ec0", "67f39ab8-c25f-48c3-84be-0ec495a553ec"].includes(
								info.RouletteTargetIds[a]
							) &&
								![
									"accident_explosion",
									"accident_electric",
									"remote_explosive",
									"accident_burn",
									"consumed_poison"
								].includes(selectedKillMethodList[a]) &&
								selectedDisguiseList[a] == "fae73e92-2307-4163-8e9f-30401ca884bf"))
					) {
						otherBannedConditions = true
					}
				}

				if (
					notMultipleLargeFirearms(selectedKillMethodList) &&
					notMultiplePistols(selectedKillMethodList) &&
					notMultipleSmgs(selectedKillMethodList) &&
					noOtherDuplicates(selectedKillMethodList) &&
					otherBannedConditions == false
				) {
					bannedConditions = false
				}
			}

			log(LogLevel.INFO, "[Roulette] Selected killmethods: " + selectedKillMethodList)
			log(LogLevel.INFO, "[Roulette] Selected disguises: " + selectedDisguiseList)

			// The following section generates objectives based on the randomized conditions

			const berlinVerificationObjective = {
				Id: "ece1b420-cbd4-442c-9a5d-0cc2caf6f2d7",
				Category: "primary",
				ObjectiveType: "setpiece",
				Image: "images/actors/mongoose_unknown_man.png",
				BriefingName: "Verify first 5 agent kills",
				BriefingText:
					"You eliminated an ICA Agent with a kill method / disguise combo that did not match the specified conditions.",
				LongBriefingText: "Eliminate 5 ICA Agents via the specified conditions",
				HUDTemplate: { display: "Verify first 5 agent kills" },
				Type: "statemachine",
				ForceShowOnLoadingScreen: false,
				ExcludeFromScoring: true,
				IsHidden: true,
				OnActive: {
					IfInProgress: { Visible: false },
					IfCompleted: { Visible: false },
					IfFailed: { Visible: false }
				},
				Definition: {
					Context: {
						KilledTargets: 0,
						Targets: ["252428ca-3f8e-4477-b2b9-58f18cff3e44"],
						PossibleTargets: [
							"252428ca-3f8e-4477-b2b9-58f18cff3e44",
							"abd1c0e7-e406-43bd-9185-419029c5bf3d",
							"922deccd-7fb4-45d9-ae3d-2cf11915c403",
							"b8e7e65b-587e-471b-894d-282cda6614d4",
							"2ab07903-e958-4af6-b01c-b62058745ce1",
							"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
							"633398ac-c4b4-4441-852d-ae6460172025",
							"eb024a5e-9580-49dc-a519-bb92c886f3b1",
							"1305c2e4-6394-4cfa-b873-22adbd0c9702",
							"f83376a4-6e56-4f2a-8122-151b272108fd",
							"8b29da09-461f-44d7-9042-d4fde829b9f2"
						]
					},
					States: {
						Start: {
							Kill: [
								{ Condition: { $eq: ["$Value.IsTarget", true] }, Actions: { $inc: "KilledTargets" } },
								{
									Condition: {
										$and: [
											{
												$inarray: {
													in: "$.PossibleTargets",
													"?": { $eq: ["$.#", "$Value.RepositoryId"] }
												}
											}
										]
									},
									Transition: "Failure"
								},
								{ Condition: { $eq: ["$.KilledTargets", 5] }, Transition: "Success" },
								{ Transition: "Start" }
							]
						}
					}
				}
			}
			let berlinVerificationObjectiveCondition

			const objectiveIdList = []

			for (let e = 0; e <= info.RouletteTargetNumber; e++) {
				const mainObjectiveId = randomUUID()
				const killMethodObjectiveId = randomUUID()
				const disguiseObjectiveId = randomUUID()

				objectiveIdList.push(`$${mainObjectiveId}`)
				objectiveIdList.push(`$${killMethodObjectiveId}`)

				const berlinNpcName = "$loc UI_ROULETTE_BERLIN_" + e

				let killDisplay

				const npcPartOne = "$($repository "
				const npcPartTwo = ").Name"

				let npcString

				if (selectedMission == "LOCATION_EDGY_FOX") {
					npcString = berlinNpcName
				} else {
					npcString = npcPartOne + info.RouletteTargetIds[e] + npcPartTwo
				}

				let weaponString

				if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e])) {
					const weaponPartOne = "$loc $($repository "
					const weaponPartTwo = ").Name_LOC"
					weaponString = weaponPartOne + selectedKillMethodList[e] + weaponPartTwo
				}

				let killMethodString

				if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e])) {
					killMethodString = weaponString
				} else {
					killMethodString = "$loc " + killLocKeys[selectedKillMethodList[e]]
				}

				const killMethodFailDisplay = { $loc: { key: "UI_ROULETTE_KILLMETHOD_FAIL", data: [killMethodString] } }

				let disguiseFailDisplay

				let berlinDesc

				if (rouletteFilters.includes("specificDisguises")) {
					objectiveIdList.push(`$${disguiseObjectiveId}`)

					let disguiseString
					if (selectedDisguiseList[e] == "suit") {
						disguiseString = "$loc UI_BRIEFING_CONDITION_HITMANSUIT"
					} else {
						const disguisePartOne = "$loc $($repository "
						const disguisePartTwo = ").Name"
						disguiseString = disguisePartOne + selectedDisguiseList[e] + disguisePartTwo
					}
					disguiseFailDisplay = { $loc: { key: "UI_ROULETTE_DISGUISE_FAIL", data: [disguiseString] } }

					if (selectedDisguiseList[e] == "suit") {
						killDisplay = {
							$loc: {
								key: "UI_ROULETTE_KILL_DISGUISED_VERBOSE_SUIT",
								data: [npcString, killMethodString, disguiseString]
							}
						}
					} else {
						killDisplay = {
							$loc: {
								key: "UI_ROULETTE_KILL_DISGUISED_VERBOSE",
								data: [npcString, killMethodString, disguiseString]
							}
						}
					}

					berlinDesc = {
						$loc: { key: "UI_ROULETTE_KILL_BERLIN_DISGUISED", data: [killMethodString, disguiseString] }
					}
				} else {
					killDisplay = { $loc: { key: "UI_ROULETTE_KILL_ANYDISGUISE", data: [npcString, killMethodString] } }
					berlinDesc = { $loc: { key: "UI_ROULETTE_KILL_BERLIN_ANYDISGUISE", data: killMethodString } }
				}

				let mainObjective

				if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7") {
					mainObjective = {
						Category: "primary",
						Type: "statemachine",
						OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
						OnActive: { IfCompleted: { Visible: true } },
						Definition: {
							Scope: "hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									"-": {
										Actions: {
											$pushunique: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"],
											$remove: ["Targets", info.RouletteTargetIds[e]]
										}
									},
									SierraLeftCar: {
										Actions: {
											$pushunique: ["Targets", info.RouletteTargetIds[e]],
											$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
										}
									},
									Pre_Kill: {
										Actions: {
											$pushunique: ["Targets", info.RouletteTargetIds[e]],
											$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
										}
									},
									Kill: [
										{
											Condition: {
												$and: [{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] }]
											},
											Transition: "Success"
										}
									]
								}
							}
						},
						Id: mainObjectiveId,
						HUDTemplate: { display: killDisplay },
						BriefingText: "",
						LongBriefingText: killDisplay,
						TargetConditions: []
					}
				} else if (info.RouletteTargetIds[e] == "ab48a89d-e8a7-4df4-ae72-f0fccaa65e7f") {
					mainObjective = {
						Category: "primary",
						Type: "statemachine",
						OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
						OnActive: { IfCompleted: { Visible: true } },
						Definition: {
							Scope: "hit",
							Context: { TargetEscaping: 1, Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									Kill: [
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									],
									Target_Leaving: [{ Actions: { $dec: "TargetEscaping" }, Transition: "TargetEscaping" }]
								},
								TargetEscaping: {
									Kill: [
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									],
									Target_Escape: { Transition: "Failure" }
								}
							}
						},
						Id: mainObjectiveId,
						HUDTemplate: { display: killDisplay },
						BriefingText: killDisplay,
						LongBriefingText: killDisplay,
						TargetConditions: []
					}
				} else if (
					info.RouletteTargetIds[e] == "57907f04-329e-4faf-b753-7e95d5c2e085" ||
					info.RouletteTargetIds[e] == "651ceb9a-117f-4f8d-89dd-9b6bd2a38b5a"
				) {
					mainObjective = {
						UpdateActivationWhileCompleted: true,
						Category: "primary",
						Type: "statemachine",
						OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
						OnActive: { IfCompleted: { Visible: true } },
						Definition: {
							Scope: "hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									Kill: [
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									]
								}
							}
						},
						Id: mainObjectiveId,
						HUDTemplate: { display: killDisplay },
						BriefingText: killDisplay,
						LongBriefingText: killDisplay,
						TargetConditions: []
					}
				} else if (
					["ballsack", "cunt", "asshole", "borisjohnson", "vladimirputin"].includes(info.RouletteTargetIds[e])
				) {
					mainObjective = {
						Category: "primary",
						ObjectiveType: "setpiece",
						Type: "statemachine",
						Definition: {
							ContextListeners: { Failure: { type: "custom", LongBriefingText: "balls" } },
							Context: {
								Targets: ["252428ca-3f8e-4477-b2b9-58f18cff3e44"],
								PossibleTargets: [
									"252428ca-3f8e-4477-b2b9-58f18cff3e44",
									"abd1c0e7-e406-43bd-9185-419029c5bf3d",
									"922deccd-7fb4-45d9-ae3d-2cf11915c403",
									"b8e7e65b-587e-471b-894d-282cda6614d4",
									"2ab07903-e958-4af6-b01c-b62058745ce1",
									"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
									"633398ac-c4b4-4441-852d-ae6460172025",
									"eb024a5e-9580-49dc-a519-bb92c886f3b1",
									"1305c2e4-6394-4cfa-b873-22adbd0c9702",
									"f83376a4-6e56-4f2a-8122-151b272108fd",
									"8b29da09-461f-44d7-9042-d4fde829b9f2"
								],
								PacifiedTargets: [],
								KilledTargets: 0
							},
							States: {
								Start: {
									Pacify: {
										Condition: { $eq: ["$Value.IsTarget", true] },
										Actions: { $pushunique: ["PacifiedTargets", "$Value.RepositoryId"] }
									},
									Kill: [
										{
											Condition: { $eq: ["$Value.IsTarget", true] },
											Actions: { $inc: "KilledTargets" }
										},
										{
											Condition: {
												$and: [
													{
														$inarray: {
															in: "$.PossibleTargets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												]
											},
											Transition: "Success"
										}
									]
								},
								Success: {
									Kill: [
										{
											Condition: {
												$and: [
													{
														$inarray: {
															in: "$.PossibleTargets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													},
													{ $lt: ["$.KilledTargets", 6] }
												]
											},
											Transition: "Failure"
										}
									]
								}
							}
						},
						Id: mainObjectiveId,
						Image: "images/actors/ica-agents.png",
						BriefingName: berlinNpcName,
						BriefingText: berlinDesc,
						LongBriefingText: berlinDesc,
						HUDTemplate: { display: killDisplay }
					}
				} else {
					mainObjective = {
						Category: "primary",
						Type: "statemachine",
						OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
						OnActive: { IfCompleted: { Visible: true } },
						Definition: {
							Scope: "hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									Kill: [
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									]
								}
							}
						},
						Id: mainObjectiveId,
						HUDTemplate: { display: killDisplay },
						BriefingText: killDisplay,
						LongBriefingText: killDisplay,
						TargetConditions: []
					}
				}

				let mainObjectiveKillMethodCondition

				if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e], 0)) {
					mainObjectiveKillMethodCondition = {
						Type: "weapon",
						RepositoryId: selectedKillMethodList[e],
						HardCondition: true,
						ObjectiveId: killMethodObjectiveId
					}
				} else {
					mainObjectiveKillMethodCondition = {
						Type: "killmethod",
						KillMethod: selectedKillMethodList[e],
						HardCondition: true,
						ObjectiveId: killMethodObjectiveId
					}
				}

				if (selectedMission != "LOCATION_EDGY_FOX") {
					mainObjective.TargetConditions.push(mainObjectiveKillMethodCondition)
				}

				let killMethodObjectiveCondition

				let firearmBroad

				if (
					selectedKillMethodList[e] == "silenced_assaultrifle" ||
					selectedKillMethodList[e] == "loud_assaultrifle"
				) {
					firearmBroad = "assaultrifle"
				} else if (selectedKillMethodList[e] == "silenced_shotgun" || selectedKillMethodList[e] == "loud_shotgun") {
					firearmBroad = "shotgun"
				} else if (
					selectedKillMethodList[e] == "silenced_sniperrifle" ||
					selectedKillMethodList[e] == "loud_sniperrifle"
				) {
					firearmBroad = "sniperrifle"
				}

				if (info.RouletteMeleeWeapons.includes(selectedKillMethodList[e], 0)) {
					killMethodObjectiveCondition = { $eq: ["$Value.KillItemRepositoryId", selectedKillMethodList[e]] }
				} else if (
					selectedKillMethodList[e] == "fiberwire" ||
					selectedKillMethodList[e] == "unarmed" ||
					basic.includes(selectedKillMethodList[e], 0)
				) {
					killMethodObjectiveCondition = { $eq: ["$Value.KillMethodBroad", selectedKillMethodList[e]] }
				} else if (
					(specificAccidents.includes(selectedKillMethodList[e], 0) &&
						!["impact_explosive", "remote_explosive", "loud_explosive", "accident_burn"].includes(
							selectedKillMethodList[e]
						)) ||
					(selectedKillMethodList[e] == "accident_burn" &&
						![
							"LOCATION_COASTALTOWN",
							"LOCATION_COASTALTOWN_MOVIESET",
							"LOCATION_COASTALTOWN_NIGHT",
							"LOCATION_COASTALTOWN_EBOLA",
							"LOCATION_THEENFORCER",
							"LOCATION_HOKKAIDO",
							"LOCATION_THECONTROLLER",
							"LOCATION_HOKKAIDO_MAMUSHI",
							"LOCATION_HOKKAIDO_FLU",
							"LOCATION_NORTHAMERICA",
							"LOCATION_NORTHAMERICA_GARTERSNAKE",
							"LOCATION_EDGY_FOX"
						].includes(selectedMission))
				) {
					killMethodObjectiveCondition = { $eq: ["$Value.KillMethodStrict", selectedKillMethodList[e]] }
				} else if (
					selectedKillMethodList[e] == "accident_burn" &&
					[
						"LOCATION_COASTALTOWN",
						"LOCATION_COASTALTOWN_MOVIESET",
						"LOCATION_COASTALTOWN_NIGHT",
						"LOCATION_COASTALTOWN_EBOLA",
						"LOCATION_THEENFORCER",
						"LOCATION_HOKKAIDO",
						"LOCATION_THECONTROLLER",
						"LOCATION_HOKKAIDO_MAMUSHI",
						"LOCATION_HOKKAIDO_FLU",
						"LOCATION_NORTHAMERICA",
						"LOCATION_NORTHAMERICA_GARTERSNAKE",
						"LOCATION_EDGY_FOX"
					].includes(selectedMission)
				) {
					killMethodObjectiveCondition = {
						$or: [
							{ $eq: ["$Value.KillMethodStrict", "accident_burn"] },
							{
								$and: [
									{ $eq: ["$Value.KillClass", "unknown"] },
									{ $inarray: { in: "$Value.DamageEvents", "?": { $eq: ["$.#", "InCloset"] } } }
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "pistol") {
					killMethodObjectiveCondition = {
						$or: [
							{ $eq: ["$Value.KillMethodBroad", "pistol"] },
							{ $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
						]
					}
				} else if (selectedKillMethodList[e] == "silenced_pistol") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.WeaponSilenced", true] },
							{
								$or: [
									{ $eq: ["$Value.KillMethodBroad", "pistol"] },
									{ $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "loud_pistol") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.WeaponSilenced", false] },
							{
								$or: [
									{ $eq: ["$Value.KillMethodBroad", "pistol"] },
									{ $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "smg") {
					killMethodObjectiveCondition = {
						$or: [
							{ $eq: ["$Value.KillMethodBroad", "smg"] },
							{
								$and: [
									{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
									{ $eq: ["$Value.KillItemCategory", "smg"] }
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "silenced_smg") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.WeaponSilenced", true] },
							{
								$or: [
									{ $eq: ["$Value.KillMethodBroad", "smg"] },
									{
										$and: [
											{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
											{ $eq: ["$Value.KillItemCategory", "smg"] }
										]
									}
								]
							}
						]
					}
				} else if (selectedKillMethodList[e] == "loud_smg") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.WeaponSilenced", false] },
							{
								$or: [
									{ $eq: ["$Value.KillMethodBroad", "smg"] },
									{
										$and: [
											{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
											{ $eq: ["$Value.KillItemCategory", "smg"] }
										]
									}
								]
							}
						]
					}
				} else if (silenced.includes(selectedKillMethodList[e], 0)) {
					killMethodObjectiveCondition = {
						$and: [{ $eq: ["$Value.WeaponSilenced", true] }, { $eq: ["$Value.KillMethodBroad", firearmBroad] }]
					}
				} else if (loud.includes(selectedKillMethodList[e], 0)) {
					killMethodObjectiveCondition = {
						$and: [{ $eq: ["$Value.WeaponSilenced", false] }, { $eq: ["$Value.KillMethodBroad", firearmBroad] }]
					}
				} else if (selectedKillMethodList[e] == "smg_elimination") {
					killMethodObjectiveCondition = {
						$and: [
							{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
							{ $eq: ["$Value.KillItemCategory", "smg"] }
						]
					}
				} else if (selectedKillMethodList[e] == "pistol_elimination") {
					killMethodObjectiveCondition = { $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
				} else if (selectedKillMethodList[e] == "weapon_elimination") {
					killMethodObjectiveCondition = {
						$or: [
							{
								$and: [
									{ $eq: ["$Value.KillMethodBroad", "melee_lethal"] },
									{ $eq: ["$Value.KillItemCategory", "smg"] }
								]
							},
							{ $eq: ["$Value.KillMethodBroad", "close_combat_pistol_elimination"] }
						]
					}
				} else if (selectedKillMethodList[e] == "impact_explosive") {
					killMethodObjectiveCondition = {
						$and: [
							{
								$inarray: {
									"?": { $eq: ["$.#", "$Value.KillItemRepositoryId"] },
									in: [
										"2a493cf9-7cb1-4aad-b892-17abf8b329f4",
										"485f8902-b7e3-4916-8b90-ea7cebb305de",
										"c95c55aa-34e5-42bd-bf27-32be3978b269",
										"af8a7b6c-692c-4a76-b9bc-2b91ce32bcbc",
										"c82fefa7-febe-46c8-90ec-c945fbef0cb4",
										"a83349bf-3d9c-43ec-92ee-c8c98cbeabc1",
										"8b7c3ec6-c072-4a21-a323-0f8751028052"
									]
								}
							},
							{ $eq: ["$Value.KillMethodBroad", "explosive"] }
						]
					}
				} else if (selectedKillMethodList[e] == "remote_explosive") {
					killMethodObjectiveCondition = {
						$and: [
							{
								$not: {
									$inarray: {
										"?": { $eq: ["$.#", "$Value.KillItemRepositoryId"] },
										in: [
											"2a493cf9-7cb1-4aad-b892-17abf8b329f4",
											"485f8902-b7e3-4916-8b90-ea7cebb305de",
											"c95c55aa-34e5-42bd-bf27-32be3978b269",
											"af8a7b6c-692c-4a76-b9bc-2b91ce32bcbc",
											"c82fefa7-febe-46c8-90ec-c945fbef0cb4",
											"a83349bf-3d9c-43ec-92ee-c8c98cbeabc1"
										]
									}
								}
							},
							{ $eq: ["$Value.KillMethodBroad", "explosive"] }
						]
					}
				} else if (selectedKillMethodList[e] == "loud_explosive") {
					killMethodObjectiveCondition = {
						$and: [
							{
								$not: {
									$inarray: {
										"?": { $eq: ["$.#", "$Value.KillItemRepositoryId"] },
										in: [
											"fc715a9a-3bf1-4768-bd67-0def61b92551",
											"9d5daae3-10c8-4f03-a85d-9bd92861a672",
											"293af6cc-dd8d-4641-b650-14cdfd00f1de"
										]
									}
								}
							},
							{ $eq: ["$Value.KillMethodBroad", "explosive"] }
						]
					}
				}

				if (selectedMission == "LOCATION_EDGY_FOX") {
					mainObjective.Definition.States.Start.Kill[1].Condition.$and.push(killMethodObjectiveCondition)
					mainObjective.Definition.States.Success.Kill[0].Condition.$and.push(killMethodObjectiveCondition)
				}

				let killMethodObjective

				if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7") {
					killMethodObjective = {
						Type: "statemachine",
						Id: killMethodObjectiveId,
						BriefingText: killMethodFailDisplay,
						Category: "primary",
						Definition: {
							Scope: "Hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									"-": {
										Actions: {
											$pushunique: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"],
											$remove: ["Targets", info.RouletteTargetIds[e]]
										}
									},
									SierraLeftCar: {
										Actions: {
											$pushunique: ["Targets", info.RouletteTargetIds[e]],
											$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
										}
									},
									Pre_Kill: {
										Actions: {
											$pushunique: ["Targets", info.RouletteTargetIds[e]],
											$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
										}
									},
									SniperKillSierraCar: { Actions: { $inc: "SniperKillAchieved" } },
									Kill: [
										{
											Condition: {
												$and: [
													{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
													killMethodObjectiveCondition
												]
											},
											Transition: "Success"
										},
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Failure"
										}
									]
								}
							}
						}
					}
				} else {
					killMethodObjective = {
						Type: "statemachine",
						Id: killMethodObjectiveId,
						BriefingText: killMethodFailDisplay,
						Category: "primary",
						Definition: {
							Scope: "Hit",
							Context: { Targets: [info.RouletteTargetIds[e]] },
							States: {
								Start: {
									Kill: [
										{
											Condition: {
												$and: [
													{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
													killMethodObjectiveCondition
												]
											},
											Transition: "Success"
										},
										{
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Failure"
										}
									]
								}
							}
						}
					}
				}

				if (rouletteFilters.includes("specificDisguises", 0)) {
					let mainObjectiveDisguiseCondition
					let disguiseObjectiveCondition

					if (selectedDisguiseList[e] == "suit") {
						disguiseObjectiveCondition = { $eq: ["$Value.OutfitIsHitmanSuit", true] }
						mainObjectiveDisguiseCondition = {
							Type: "hitmansuit",
							RepositoryId: "0c90c861-48b2-4058-9785-9e577006f3b4",
							HardCondition: true,
							ObjectiveId: disguiseObjectiveId
						}
					} else {
						disguiseObjectiveCondition = {
							$inarray: { "?": { $eq: ["$.#", "$Value.OutfitRepositoryId"] }, in: [selectedDisguiseList[e]] }
						}
						mainObjectiveDisguiseCondition = {
							Type: "disguise",
							RepositoryId: selectedDisguiseList[e],
							HardCondition: true,
							ObjectiveId: disguiseObjectiveId
						}
					}

					if (selectedMission == "LOCATION_EDGY_FOX") {
						mainObjective.Definition.States.Start.Kill[1].Condition.$and.push(disguiseObjectiveCondition)
						mainObjective.Definition.States.Success.Kill[0].Condition.$and.push(disguiseObjectiveCondition)
						berlinVerificationObjectiveCondition = {
							$not: { $and: [disguiseObjectiveCondition, killMethodObjectiveCondition] }
						}
					} else {
						mainObjective.TargetConditions.push(mainObjectiveDisguiseCondition)
					}

					let disguiseObjective

					if (selectedMission != "LOCATION_EDGY_FOX") {
						if (info.RouletteTargetIds[e] == "c0ab162c-1502-40d5-801f-c5471289d6b7") {
							disguiseObjective = {
								Type: "statemachine",
								Id: disguiseObjectiveId,
								BriefingText: disguiseFailDisplay,
								category: "primary",
								Definition: {
									Scope: "Hit",
									Context: { Targets: [info.RouletteTargetIds[e]] },
									States: {
										Start: {
											"-": {
												Actions: {
													$pushunique: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"],
													$remove: ["Targets", info.RouletteTargetIds[e]]
												}
											},
											SierraLeftCar: {
												Actions: {
													$pushunique: ["Targets", info.RouletteTargetIds[e]],
													$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
												}
											},
											Pre_Kill: {
												Actions: {
													$pushunique: ["Targets", info.RouletteTargetIds[e]],
													$remove: ["Targets", "af77ead8-72d4-461c-adb8-dd55146d029f"]
												}
											},
											Kill: [
												{
													Condition: {
														$and: [
															disguiseObjectiveCondition,
															{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] }
														]
													},
													Transition: "Success"
												},
												{
													Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
													Transition: "Failure"
												}
											]
										}
									}
								}
							}
						} else {
							disguiseObjective = {
								Type: "statemachine",
								Id: disguiseObjectiveId,
								BriefingText: disguiseFailDisplay,
								category: "primary",
								Definition: {
									Scope: "Hit",
									Context: { Targets: [info.RouletteTargetIds[e]] },
									States: {
										Start: {
											Kill: [
												{
													Condition: {
														$and: [
															disguiseObjectiveCondition,
															{ $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] }
														]
													},
													Transition: "Success"
												},
												{
													Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
													Transition: "Failure"
												}
											]
										}
									}
								}
							}
						}

						baseContract.Data.Objectives.push(disguiseObjective)
					}
				} else {
					if (selectedMission == "LOCATION_EDGY_FOX") {
						berlinVerificationObjectiveCondition = { $not: killMethodObjectiveCondition }
					}
				}

				baseContract.Data.Objectives.push(mainObjective)

				if (selectedMission != "LOCATION_EDGY_FOX") {
					baseContract.Data.Objectives.push(killMethodObjective)
				} else {
					berlinVerificationObjective.Definition.States.Start.Kill[1].Condition.$and.push(
						berlinVerificationObjectiveCondition
					)
				}

				let pacificationBanned

				if (
					([
						"5b54d9fb-fa85-4302-a8d5-c5c5e97344c4",
						"963c2774-cb9a-4b0c-ab69-210b2405383b",
						"076f23cc-09d8-423f-b890-74020f53b1d6",
						"78f98c70-b7be-4578-9b6a-1c96a3e1ff1a",
						"c7c9e213-16f9-4215-bf07-dd8f801ce3e0",
						"967abcf9-2672-4e81-8fef-211aaa366747",
						"ballsack",
						"cunt",
						"asshole",
						"borisjohnson",
						"vladimirputin"
					].includes(info.RouletteTargetIds[e]) &&
						(selectedKillMethodList[e] == "loud_pistol" ||
							selectedKillMethodList[e] == "loud_smg" ||
							loud.includes(selectedKillMethodList[e]))) ||
					selectedMission == "LOCATION_EDGY_FOX"
				) {
					pacificationBanned = true
				} else {
					pacificationBanned = false
				}

				if (!rouletteFilters.includes("rrBannedKills") && pacificationBanned == true) {
					// do fucking nothing
				} else if (!specificAccidents.includes(selectedKillMethodList[e]) && pacificationBanned == false) {
					const selectedPacificationNumber =
						pacificationNumber[getRandomIntWithSeed(0, pacificationNumber.length - 1, seed++)]
					if (selectedPacificationNumber == "4") {
						const pacificationObjectiveId = randomUUID()
						const pacificationObjective = {
							Type: "statemachine",
							Id: pacificationObjectiveId,
							ObjectiveType: "setpiece",
							Image: "images/Contracts/gamechangers/gamechanger_roulette_nopacifications.png",
							BriefingName: "$loc UI_ROULETTE_NOKO_TITLE",
							BriefingText: { $loc: { key: "UI_ROULETTE_NOKO_DESC", data: [npcString] } },
							LongBriefingText: { $loc: { key: "UI_ROULETTE_NOKO_LONGDESC", data: [npcString] } },
							Category: "primary",
							HUDTemplate: {
								display: { $loc: { key: "UI_ROULETTE_NOKO_DESC", data: [npcString] } },
								iconType: 7
							},
							Definition: {
								display: { iconType: 7 },
								Scope: "session",
								States: {
									Start: {
										Pacify: {
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Failure"
										},
										Kill: {
											Condition: { $eq: ["$Value.RepositoryId", info.RouletteTargetIds[e]] },
											Transition: "Success"
										}
									}
								}
							}
						}
						baseContract.Data.Objectives.push(pacificationObjective)
					}
				}
			}

			if (selectedMission == "LOCATION_EDGY_FOX") {
				baseContract.Data.Objectives.push(berlinVerificationObjective)
			}

			// Handling for Soders objective

			const sodersKillMethodPool = [
				"pistol",
				"loud_pistol",
				"silenced_pistol",
				"smg",
				"loud_smg",
				"silenced_smg",
				"assaultrifle",
				"loud_assaultrifle",
				"silenced_assaultrifle",
				"shotgun",
				"loud_shotgun",
				"silenced_shotgun",
				"sniperrifle",
				"loud_sniperrifle",
				"silenced_sniperrifle",
				"throwheart",
				"shootheart",
				"electrocution",
				"explosion",
				"stemcells",
				"spidermachine"
			]

			if (selectedMission == "LOCATION_HOKKAIDO") {
				const selectedSodersKillMethod =
					sodersKillMethodPool[getRandomIntWithSeed(0, sodersKillMethodPool.length - 1, seed++)]

				const selectedSodersDisguise = disguisePool[getRandomIntWithSeed(0, disguisePool.length - 1, seed++)]

				const sodersObjectiveId = randomUUID()

				let pushedSodersKillMethod

				if (
					[
						"pistol",
						"loud_pistol",
						"silenced_pistol",
						"smg",
						"loud_smg",
						"silenced_smg",
						"assaultrifle",
						"loud_assaultrifle",
						"silenced_assaultrifle",
						"shotgun",
						"loud_shotgun",
						"silenced_shotgun",
						"sniperrifle",
						"loud_sniperrifle",
						"silenced_sniperrifle",
						"explosion"
					].includes(selectedSodersKillMethod)
				) {
					pushedSodersKillMethod = "Body_Kill"
				} else if (selectedSodersKillMethod == "throwheart" || selectedSodersKillMethod == "shootheart") {
					pushedSodersKillMethod = "Heart_Kill"
				} else if (selectedSodersKillMethod == "electrocution") {
					pushedSodersKillMethod = "Soder_Electrocuted"
				} else if (selectedSodersKillMethod == "stemcells") {
					pushedSodersKillMethod = "Poison_Kill"
				} else if (selectedSodersKillMethod == "spidermachine") {
					pushedSodersKillMethod = "Spidermachine_Kill"
				}

				let sodersCondition1

				if (rouletteFilters.includes("specificDisguises", 0) && selectedSodersDisguise != "suit") {
					sodersCondition1 = {
						Condition: {
							$and: [
								{ $eq: ["$.CurrentDisguise", selectedSodersDisguise] },
								{ $eq: ["$Value.Event_metricvalue", pushedSodersKillMethod] }
							]
						},
						Transition: "Success"
					}
				} else if (rouletteFilters.includes("specificDisguises", 0) && selectedSodersDisguise == "suit") {
					sodersCondition1 = {
						Condition: {
							$and: [
								{
									$not: {
										$any: {
											"?": { $eq: ["$.#", "$.CurrentDisguise"] },
											in: [
												"c98a6467-5dd9-4041-8bff-119445750d4d",
												"52992428-8884-48db-9764-e486d17d4804",
												"d6bbbe57-8cc8-45ed-b1cb-d1f9477c4b61",
												"d9e0fbe7-ff74-4030-bed6-5a33a01acead",
												"25406dac-d206-48c7-a6df-dffb887c9227",
												"a8191fb6-9a6d-4145-8baf-d786e6f392b7",
												"3d4424a3-23f9-4cfe-b225-2e06c17d780b",
												"6a25f81d-cf2e-4e47-9b15-0f712a3f71d9",
												"5270225d-797a-43f8-8435-078ae0d92249",
												"f6f53c39-17f9-48cf-9594-7a696b036d61",
												"b8deb948-a0a9-4dcb-9df4-1c2ecd29765f",
												"b00380d9-3f84-4484-8bd6-39c0872da414",
												"427bac46-50b4-4470-9b0e-478efcd37793",
												"f4ea7065-d32b-4a97-baf9-98072a9c8128",
												"b8dbb7b6-fef9-4782-923f-ddebc573625e",
												"06456d4d-da36-4008-bea5-c0b985a565f5",
												"8e01f48f-ef06-448c-9d22-5d58c4414968",
												"5946924c-958d-48f4-ada3-86beb58aa778"
											]
										}
									}
								},
								{ $eq: ["$Value.Event_metricvalue", pushedSodersKillMethod] }
							]
						},
						Transition: "Success"
					}
				} else {
					sodersCondition1 = {
						Condition: { $eq: ["$Value.Event_metricvalue", pushedSodersKillMethod] },
						Transition: "Success"
					}
				}

				const sodersCondition2 = {
					Condition: { $eq: ["$Value.Event_metricvalue", pushedSodersKillMethod] },
					Transition: "Failure"
				}

				let sodersBriefing
				let sodersKillDisplay

				killMethodString = "$loc " + killLocKeys[selectedSodersKillMethod]

				if (rouletteFilters.includes("specificDisguises")) {
					let disguiseString
					if (selectedSodersDisguise == "suit") {
						disguiseString = "$loc UI_BRIEFING_CONDITION_HITMANSUIT"
					} else {
						const disguisePartOne = "$loc $($repository "
						const disguisePartTwo = ").Name"
						disguiseString = disguisePartOne + selectedSodersDisguise + disguisePartTwo
					}
					sodersBriefing = {
						$loc: { key: "UI_ROULETTE_SODERS_BRIEFING", data: [killMethodString, disguiseString] }
					}
					sodersKillDisplay = {
						$loc: {
							key: "UI_ROULETTE_KILL_DISGUISED",
							data: [
								"$($repository 5651198f-9ef7-4f3c-908b-a570f1cd64e2).Name",
								killMethodString,
								disguiseString
							]
						}
					}
				} else {
					sodersBriefing = { $loc: { key: "UI_ROULETTE_SODERS_ANYDISGUISE", data: [killMethodString] } }
					sodersKillDisplay = {
						$loc: {
							key: "UI_ROULETTE_KILL_ANYDISGUISE",
							data: ["$($repository 5651198f-9ef7-4f3c-908b-a570f1cd64e2).Name", killMethodString]
						}
					}
				}

				const sodersObjective = {
					Category: "primary",
					ObjectiveType: "setpiece",
					Image: "images/actors/Snowcrane_erich_soders_briefing.jpg",
					DisplayAsKillObjective: false,
					ForceShowOnLoadingScreen: true,
					Type: "statemachine",
					Definition: {
						Context: {
							CurrentDisguise: "unknown",
							TrackDisguiseChanges: true,
							Targets: ["5651198f-9ef7-4f3c-908b-a570f1cd64e2"],
							TargetOpportunities: [
								"d2e5bf2d-b6cd-474f-88b1-6aa0c7e641c3",
								"dd0ef769-afd7-4754-8058-0677b958d91a",
								"b3a982f1-2773-4a97-8492-614b897a8f98",
								"15af2544-833e-459e-9de9-39c109b6f732"
							]
						},
						States: {
							Start: {
								StartingSuit: { Actions: { $set: ["CurrentDisguise", "$Value"] } },
								OpportunityEvents: {
									Condition: {
										$and: [
											{ $eq: ["$Value.Event", "Disabled"] },
											{
												$inarray: {
													in: "$.TargetOpportunities",
													"?": { $eq: ["$.#", "$Value.RepositoryId"] }
												}
											}
										]
									},
									Actions: { $set: ["TrackDisguiseChanges", false] }
								},
								Disguise: {
									Condition: { $eq: ["$.TrackDisguiseChanges", true] },
									Actions: { $set: ["CurrentDisguise", "$Value"] }
								},
								Level_Setup_Events: [
									sodersCondition1,
									sodersCondition2,
									{
										Condition: {
											$any: {
												"?": { $eq: ["$.#", "$Value.Event_metricvalue"] },
												in: [
													"Heart_Kill",
													"Soder_Electrocuted",
													"Poison_Kill",
													"Spidermachine_kill",
													"Body_Kill"
												]
											}
										},
										Transition: "Failure"
									}
								]
							}
						}
					},
					Id: sodersObjectiveId,
					BriefingName: {
						$loc: {
							key: "UI_ROULETTE_SODERSNAME",
							data: "$($repository 5651198f-9ef7-4f3c-908b-a570f1cd64e2).Name"
						}
					},
					BriefingText: sodersBriefing,
					LongBriefingText: sodersBriefing,
					HUDTemplate: { display: sodersKillDisplay }
				}

				baseContract.Data.Objectives.splice(0, 0, sodersObjective)
			}

			// Handling for required exit objectives (randomization and json patching)

			if (rouletteFilters.includes("specificExit")) {
				const selectedExit = exitPool[getRandomIntWithSeed(0, exitPool.length - 1, seed++)]
				log(LogLevel.INFO, "[Roulette] Selected exit:" + selectedExit)

				const uppercaseExit = selectedExit.toUpperCase()

				const exitString = "$loc " + uppercaseExit

				const exitDummyId = randomUUID()

				const objectiveIdsForExit = baseContract.Data.Objectives.map((item) => item.Id)

				if (info.RouletteExtraObjectives.length != 0) {
					objectiveIdsForExit.push.apply(objectiveIdsForExit, info.RouletteExtraObjectives)
				}

				const exitObjectiveCount = objectiveIdsForExit.length

				const exitDummyObjective = [
					{
						Type: "statemachine",
						Id: exitDummyId,
						ObjectiveType: "custom",
						Category: "secondary",
						BriefingName: "$loc UI_CONTRACT_UGC_REQUIRED_EXIT_NAME",
						BriefingText: { $loc: { key: "UI_ROULETTE_EXIT_DESC", data: [exitString] } },
						LongBriefingText: { $loc: { key: "UI_ROULETTE_EXIT_DESC", data: [exitString] } },
						HUDTemplate: {
							display: { $loc: { key: "UI_ROULETTE_EXIT_DESC", data: [exitString] } },
							iconType: 7
						},
						Image: "images/contractconditions/condition_roulette_requiredexit.png",
						ShowInHud: true,
						ForceShowOnLoadingScreen: true,
						ExcludeFromScoring: true,
						OnActive: { IfCompleted: { Visible: false } },
						Definition: {
							Constants: { Goal: exitObjectiveCount },
							Context: { Count: 0, GameChangers: objectiveIdsForExit },
							States: {
								Start: {
									ObjectiveCompleted: [
										{
											Condition: {
												$any: { "?": { $eq: ["$.#", "$Value.Id"] }, in: "$.GameChangers" }
											},
											Actions: { $inc: "Count" }
										},
										{ Condition: { $eq: ["$.Count", "$.Goal"] }, Transition: "Success" }
									]
								}
							}
						}
					}
				]

				baseContract.Data.Objectives.push.apply(baseContract.Data.Objectives, exitDummyObjective)

				const exitObjectiveId = randomUUID()

				const exitObjective = [
					{
						Type: "statemachine",
						Id: exitObjectiveId,
						ObjectiveType: "custom",
						Category: "secondary",
						Exits: [selectedExit],
						ShowInHud: false,
						IsHidden: true,
						ExcludeFromScoring: true,
						Definition: {
							Scope: "session",
							Context: { Exited: false, LastItemDroppedTime: 0, LastKillTime: 0 },
							States: {
								Start: { "-": [{ Transition: "Success" }] },
								Success: {
									exit_gate: [{ Actions: { $set: ["Exited", true] } }],
									TaxiDriverDistracted: [{ Actions: { $set: ["LastItemDroppedTime", "$Timestamp"] } }],
									Kill: [{ Actions: { $set: ["LastKillTime", "$Timestamp"] } }],
									ItemDropped: [{ Actions: { $set: ["LastItemDroppedTime", "$Timestamp"] } }],
									ExitInventory: [{ Actions: { $set: ["LastItemDroppedTime", "$Timestamp"] } }],
									ItemRemovedFromInventory: [{ Actions: { $set: ["LastItemDroppedTime", "$Timestamp"] } }],
									ItemThrown: [{ Actions: { $set: ["LastItemDroppedTime", "$Timestamp"] } }],
									ExitDisabled: [
										{
											Condition: {
												$or: [
													{
														$and: [
															{ $eq: ["$Value", selectedExit] },
															{ $eq: ["$.Exited", false] },
															{ $not: { $eq: ["$.LastItemDroppedTime", "$Timestamp"] } }
														]
													},
													{ $eq: ["$.LastKillTime", "$Timestamp"] }
												]
											},
											Transition: "Failure"
										}
									]
								}
							}
						}
					}
				]

				baseContract.Data.Objectives.push.apply(baseContract.Data.Objectives, exitObjective)
			}

			// Handling for other extra objectives

			function additionalObjectives(selectedMission) {
				switch (selectedMission) {
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
						return [
							{
								Id: "e15b5171-2b12-4966-9339-3344042f9867",
								ObjectiveType: "setpiece",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/octopus/Contract_Octopus_Virus_ObjectiveTile.jpg",
								BriefingName: "$loc UI_CONTRACT_OCTOPUS_VIRUS_BRIEFING_NAME",
								LongBriefingText: "$loc UI_CONTRACT_OCTOPUS_VIRUS_BRIEFING_DESC",
								Category: "primary",
								HUDTemplate: { display: "$loc UI_CONTRACT_OCTOPUS_OBJ_2" },
								BriefingText: "$loc UI_CONTRACT_OCTOPUS_OBJ_2",
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["53629764-635d-4d11-b671-7ba9b5a03298"] },
									States: { Start: { VirusDestroyed: [{ Transition: "Success" }] } }
								}
							},
							{
								Id: "5ff67d0f-9fcc-4775-ad60-364e69571388",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_OCTOPUS_FAIL_SILVIO_ESCAPED",
								HUDTemplate: { display: "$loc UI_CONTRACT_OCTOPUS_OBJ_3" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { SilvioSeaplaneEscaping: { Transition: "EscapeCountdownStart" } },
										EscapeCountdownStart: {
											$timer: { Condition: { $after: 90 }, Transition: "Failure" },
											Kill: [
												{
													Condition: {
														$eq: ["$Value.RepositoryId", "0dfaea51-3c36-4722-9eff-f1e7ef139878"]
													},
													Transition: "Success"
												}
											]
										}
									}
								}
							}
						]
					case "LOCATION_COASTALTOWN_EBOLA":
						return [
							{
								Id: "f6d7ccfd-6f0b-4e01-b80f-982c051c4c8e",
								Category: "primary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/whitespider/002_ebola/WS_Ebola_Virus_Sample.jpg",
								BriefingName: "$loc UI_CONTRACT_EBOLA_OBJ_3_TITLE",
								BriefingText: "$loc UI_CONTRACT_EBOLA_OBJ_3_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_EBOLA_OBJ_3" },
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["8521184b-4899-4e63-b9d0-e0bf830706a3"] },
									States: {
										Start: {
											ItemPickedUp: {
												Condition: {
													$eq: ["$Value.RepositoryId", "8521184b-4899-4e63-b9d0-e0bf830706a3"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_MARRAKECH_NIGHT":
						return [
							{
								Id: "341c93cc-05b5-45df-8b32-17ffa44e29ac",
								Category: "primary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/unlockables/item_perspective_74a4f6ee-b465-437c-bef9-3a67c9932853_0.jpg",
								BriefingName: "$loc UI_CONTRACT_PYTHON_OBJ_DOCS_DESC_SHORT",
								BriefingText: "$loc UI_CONTRACT_PYTHON_OBJ_DOCS_NAME",
								LongBriefingText: "$loc UI_CONTRACT_PYTHON_OBJ_DOCS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_PYTHON_OBJ_DOCS_NAME" },
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["74a4f6ee-b465-437c-bef9-3a67c9932853"] },
									States: {
										Start: {
											ItemPickedUp: {
												Condition: {
													$eq: ["$Value.RepositoryId", "74a4f6ee-b465-437c-bef9-3a67c9932853"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_HOKKAIDO":
						return [
							{
								Id: "5b1534ef-7848-440c-855a-d2635663dd74",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_SNOWCRANE_FAIL_ESCAPE",
								HUDTemplate: { display: "$loc UI_CONTRACT_SNOWCRANE_OBJ_ESCAPE" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { TargetEscapeStarted: { Transition: "Countdown" } },
										Countdown: {
											TargetEscapeFoiled: { Transition: "Success" },
											$timer: { Condition: { $after: 45 }, Transition: "Failure" },
											Kill: {
												Condition: {
													$eq: ["$Value.RepositoryId", "9bebb40a-3746-4ba2-8bfc-a1fcabaec72c"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_THECONTROLLER":
						return [
							{
								Id: "b1ec35e8-2b35-4394-815f-ac4db064f877",
								ObjectiveType: "custom",
								Image: "Images/Contracts/sarajevosix/Orbis006_SeaBreeze/Objective1.jpg",
								BriefingName: "$loc UI_CONTRACT_SEABREEZE_OBJ_1_TITLE",
								BriefingText: "$loc UI_CONTRACT_SEABREEZE_OBJ_1_TITLE",
								LongBriefingText: "$loc UI_CONTRACT_SEABREEZE_OBJ_1_DESC",
								Category: "primary",
								HUDTemplate: {
									display: "$loc UI_CONTRACT_SEABREEZE_OBJ_1_TITLE",
									iconType: 17
								},
								Type: "statemachine",
								Definition: {
									Context: {
										Targets: ["08374fe4-147e-48ca-a662-505be5409ae9"]
									},
									States: {
										Start: {
											UncoveredEvidence: {
												Transition: "Success"
											},
											Spotted: {
												Transition: "Failure"
											}
										}
									}
								}
							}
						]
					case "LOCATION_HOKKAIDO_FLU":
						return [
							{
								Id: "b8ffc636-4f9a-49b5-8293-98839a6ca202",
								ObjectiveType: "custom",
								IgnoreIfInactive: true,
								OnActive: { IfCompleted: { Visible: false } },
								OnInactive: { IfCompleted: { State: "Completed" } },
								Image: "images/contracts/whitespider/004_flu/Eliminate_Infected_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD",
								BriefingText: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ",
								Category: "primary",
								HUDTemplate: { display: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ", iconType: 19 },
								Type: "statemachine",
								Definition: {
									ContextListeners: {
										TargetsCounter: {
											type: "objective-counter",
											header: "UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD"
										}
									},
									Context: { KilledActors: [], Targets: [], TargetsCounter: 0 },
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: {
											TargetPicked: [
												{
													Condition: {
														$not: {
															$eq: [
																"3798fcf3-4e33-40db-a8a2-c160a3ec55bf",
																"01822ba2-7b3b-4bbd-a9f3-cf8006ba945a"
															]
														}
													},
													Actions: {
														$inc: "TargetsCounter",
														$pushunique: ["Targets", "$Value.RepositoryId"]
													},
													Transition: "TargetPicked"
												}
											]
										},
										TargetPicked: {
											TargetPicked: [
												{
													Condition: {
														$not: {
															$eq: [
																"3798fcf3-4e33-40db-a8a2-c160a3ec55bf",
																"01822ba2-7b3b-4bbd-a9f3-cf8006ba945a"
															]
														}
													},
													Actions: {
														$inc: "TargetsCounter",
														$pushunique: ["Targets", "$Value.RepositoryId"]
													}
												}
											],
											Kill: [
												{ Actions: { $pushunique: ["KilledActors", "$Value.RepositoryId"] } },
												{
													Actions: { $dec: "TargetsCounter" },
													Condition: {
														$inarray: {
															in: "$.Targets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												},
												{
													Condition: {
														$all: {
															in: "$.Targets",
															"?": {
																$any: { in: "$.KilledActors", "?": { $eq: ["$.#", "$.##"] } }
															}
														}
													},
													Transition: "Success"
												}
											],
											ContractLoad: [{ Actions: { $set: ["TargetsCounter", "$.TargetsCounter"] } }]
										}
									}
								}
							},
							{
								Id: "2c22eb96-bad8-4514-83c4-eece9c2c5988",
								ObjectiveType: "custom",
								IgnoreIfInactive: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: true }
								},
								Image: "images/contracts/whitespider/004_flu/Eliminate_Infected_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD",
								BriefingText: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ",
								ExcludeFromScoring: true,
								Category: "secondary",
								HUDTemplate: { display: "$loc UI_CONTRACT_FLU_ELIMINATE_INFECTED_OBJ", iconType: 19 },
								Type: "statemachine",
								Definition: {
									ContextListeners: {
										TotalTargetsCounter: {
											type: "objective-counter",
											header: "UI_CONTRACT_FLU_ELIMINATE_INFECTED_COUNT_HEAD"
										}
									},
									Context: { TotalTargetsCounter: 0 },
									States: {
										Start: {
											TargetPicked: [{ Actions: { $inc: "TotalTargetsCounter" } }],
											ContractLoad: [
												{ Actions: { $set: ["TotalTargetsCounter", "$.TotalTargetsCounter"] } }
											],
											ContractEnd: [{ Transition: "Success" }],
											exit_gate: [{ Transition: "Success" }]
										}
									}
								}
							},
							{
								Id: "85745a86-a55a-4286-bff8-44a7960f87c8",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: { IfInProgress: { Visible: false } },
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { "47_Infected": { Transition: "Success" } } }
								}
							},
							{
								Id: "e98be877-94bb-40a8-959f-5353a7704825",
								ObjectiveType: "custom",
								IgnoreIfInactive: true,
								OnActive: { IfCompleted: { Visible: false } },
								Activation: { $eq: ["$85745a86-a55a-4286-bff8-44a7960f87c8", "Completed"] },
								Image: "images/contracts/whitespider/004_flu/WS_Flu_Obj_Antidote.jpg",
								BriefingName: "$loc UI_CONTRACT_FLU_ANTIDOTE_TITLE",
								BriefingText: "$loc UI_CONTRACT_FLU_ANTIDOTE_DESC",
								Category: "primary",
								HUDTemplate: { display: "$loc UI_CONTRACT_FLU_ANTIDOTE_OBJ" },
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["d940d53e-738c-4033-8bfd-c2ee28ae4e8a"] },
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { "47_Infected": { Transition: "Get_Antidote" } },
										Get_Antidote: {
											"47_Cured": { Transition: "Success" },
											$timer: { Condition: { $after: 300 }, Transition: "Failure" }
										}
									}
								}
							}
						]
					case "LOCATION_NEWZEALAND":
						return [
							{
								_comment: "----- Enter House -----",
								Id: "2022ec96-b328-4aa7-a309-507fd263b235",
								Category: "primary",
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/Sheep_Enter_House.jpg",
								BriefingName: "$loc UI_CONTRACT_SHEEP_ENTER_NAME",
								BriefingText: "$loc UI_CONTRACT_SHEEP_ENTER_DESC",
								LongBriefingText: "$loc UI_CONTRACT_SHEEP_ENTER_LONGDESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_SHEEP_ENTER_NAME", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { HouseEnteredEvent: { Transition: "Success" } } } }
							},
							{
								_comment: "----- Gather intel -----",
								Id: "55b42190-ab18-404e-8686-b60358dea1d4",
								Category: "primary",
								Primary: true,
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								UpdateActivationWhileCompleted: true,
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/Sheep_Gather_Intel.jpg",
								BriefingName: "$loc UI_CONTRACT_SHEEP_INTEL_NAME",
								BriefingText: "$loc UI_CONTRACT_SHEEP_INTEL_DESC",
								LongBriefingText: "$loc UI_CONTRACT_SHEEP_INTEL_LONGDESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_SHEEP_INTEL_NAME", iconType: 17 },
								Activation: { $eq: ["$2022ec96-b328-4aa7-a309-507fd263b235", "Completed"] },
								Type: "statemachine",
								Definition: { States: { Start: { IntelGatheredEvent: { Transition: "Success" } } } },
								OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
								OnActive: { IfCompleted: { Visible: true } }
							}
						]
					case "LOCATION_MIAMI":
						return [
							{
								Id: "e4b445db-bf1a-4239-acdc-83d945d198a7",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { TargetEscapeStarted: { Transition: "Success" } } }
								}
							},
							{
								Id: "5b1534ef-7848-440c-855a-d2635663dd74",
								Category: "primary",
								ExcludeFromScoring: true,
								IgnoreIfInactive: true,
								Activation: { $eq: ["$e4b445db-bf1a-4239-acdc-83d945d198a7", "Completed"] },
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_FLAMINGO_ROBERT_ESCAPED",
								HUDTemplate: { display: "$loc UI_CONTRACT_FLAMINGO_ROBERT_ESCAPING" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { TargetEscapeStarted: { Transition: "TargetIsEscaping" } },
										TargetIsEscaping: {
											TargetEscaped: { Transition: "Failure" },
											Kill: {
												Condition: {
													$eq: ["$Value.RepositoryId", "ee454990-0c4b-49e5-9572-a67887325283"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_COLOMBIA_ANACONDA":
						return [
							{
								Id: "d61d68e2-1e72-4c50-9c65-f2106ae30a9d",
								Category: "primary",
								ObjectiveType: "custom",
								Image: "images/unlockables/item_perspective_e5bde241-5958-496d-9d2d-39932fe93123_0.jpg",
								ForceShowOnLoadingScreen: true,
								BriefingName: "$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_NAME",
								BriefingText: "$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_TEXT",
								LongBriefingText: "$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_LONG",
								HUDTemplate: { display: "$loc UI_CONTRACT_ANACONDA_OBJ_DOCS_HUD", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: { Targets: ["e5bde241-5958-496d-9d2d-39932fe93123"] },
									States: {
										Start: {
											ItemPickedUp: {
												Condition: {
													$eq: ["$Value.RepositoryId", "e5bde241-5958-496d-9d2d-39932fe93123"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_MUMBAI":
						return [
							{
								_comment: "----- Identify the Maelstrom -----",
								Id: "7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2",
								Category: "primary",
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/mongoose_wazir_kale.jpg",
								BriefingName: "$loc UI_CONTRACT_MONGOOSE_OBJ_ID_TITLE",
								BriefingText: "$loc UI_CONTRACT_MONGOOSE_OBJ_ID_DESC",
								LongBriefingText: "$loc UI_CONTRACT_MONGOOSE_OBJ_ID_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_MONGOOSE_OBJ_ID_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { IdentifyMaelstrom: { Transition: "Success" } } } }
							},
							{
								_comment: "----- Eliminate the Maelstrom Identified -----",
								Id: "85c5ac7e-55ba-44fc-9225-82e6c1250b51",
								UpdateActivationWhileCompleted: true,
								IsHidden: false,
								Category: "primary",
								Activation: { $eq: ["$7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2", "Completed"] },
								SuccessEvent: {
									EventName: "Kill",
									EventValues: { RepositoryId: "c7c9e213-16f9-4215-bf07-dd8f801ce3e0" }
								},
								OnActive: { IfCompleted: { Visible: true } },
								OnInactive: { IfCompleted: { State: "Completed" } }
							},
							{
								_comment: "----- Eliminate the Maelstrom Not identified -----",
								Id: "7161cbf5-af3a-4a1b-b2b8-60437c4e8187",
								UpdateActivationWhileCompleted: true,
								IsHidden: true,
								ExcludeFromScoring: true,
								Category: "primary",
								Activation: { $eq: ["$7effacb2-77d2-4a9c-86a7-6a69eb0aa1e2", "InProgress"] },
								SuccessEvent: {
									EventName: "Kill",
									EventValues: { RepositoryId: "c7c9e213-16f9-4215-bf07-dd8f801ce3e0" }
								},
								OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
								OnActive: { IfInProgress: { Visible: false }, IfCompleted: { Visible: false } }
							}
						]
					case "LOCATION_NORTHAMERICA":
						return [
							{
								_comment: "----- Find Clues Dynamic Counter -----",
								Id: "369dd2f7-acfa-4c51-b03d-dbbb4bb863ac",
								Category: "primary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/skunk_trackingtheconstant.jpg",
								BriefingName: "$loc UI_CONTRACT_SKUNK_OBJ_CLUES_TITLE",
								LongBriefingText: "$loc UI_CONTRACT_SKUNK_OBJ_CLUES_DESC",
								BriefingText: "$loc UI_CONTRACT_SKUNK_OBJ_CLUES_HEADER",
								HUDTemplate: { display: "$loc UI_CONTRACT_SKUNK_OBJ_CLUES_TITLE", iconType: 17 },
								Type: "statemachine",
								Scope: "hit",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_SKUNK_OBJ_CLUES_DYNAMIC_TITLE",
														data: ["$.IntelCounter", "$.total"]
													}
												},
												iconType: 17
											}
										}
									},
									Context: { IntelCounter: 0, update_counter: 1, total: 3 },
									States: {
										Start: {
											One_Clue_Found: { Actions: { $inc: "IntelCounter", $dec: "update_counter" } },
											Two_Clues_Found: { Actions: { $inc: "IntelCounter", $dec: "update_counter" } },
											Three_Clues_Found: { Actions: { $inc: "IntelCounter", $dec: "update_counter" } },
											AllCluesCollected: { Transition: "Success" }
										}
									}
								}
							},
							{
								Id: "8d1a5ed6-2e2d-427e-b88b-b31c1d2a9d87",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: true },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { BackgroundCheckStarted: { Transition: "Failure" } } }
								}
							},
							{
								Activation: { $eq: ["$8d1a5ed6-2e2d-427e-b88b-b31c1d2a9d87", "Failed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_SKUNK_TIMER_BACKGROUNDCHECK" },
								Id: "f92b9623-6cb5-44cb-b9a2-bf483a3bfe1d",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_HAWK_TIMER_TIMED_OUT", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { BeginTimer: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 300 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											},
											EndTimer: { Transition: "Failure" }
										}
									}
								}
							}
						]
					case "LOCATION_NORTHSEA":
						return [
							{
								_comment: "----- [HIDDEN] Do not Eliminate The Constant -----",
								Id: "a50652e6-eccb-4491-97ea-d03ca15b11a0",
								Primary: true,
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								ExcludeFromScoring: true,
								OnActive: { IfFailure: { Visible: true } },
								Image: "images/actors/Magpie_The_Constant.jpg",
								BriefingName: "$loc UI_CONTRACT_MAGPIE_CONSTANT_NAME",
								BriefingText: "$loc UI_CONTRACT_MAGPIE_CONSTANT_OBJ",
								HUDTemplate: { display: "$loc UI_CONTRACT_MAGPIE_CONSTANT_OBJ", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: { Start: { Constant_Down: { Transition: "Failure" } } }
								}
							},
							{
								Id: "0b6010b3-988f-4066-90ff-1f872128aff4",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { ActivateConstantObjective: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- [OPTIONAL] Help Grey Kidnap The Constant -----",
								Id: "9eb900f5-4d1e-4464-8ea9-1a9df6b869d0",
								Category: "secondary",
								UpdateActivationWhileCompleted: false,
								IgnoreIfInactive: true,
								ExcludeFromScoring: true,
								OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
								Activation: { $eq: ["$0b6010b3-988f-4066-90ff-1f872128aff4", "Completed"] },
								OnActive: { IfCompleted: { Visible: true } },
								ObjectiveType: "custom",
								Image: "images/actors/Magpie_The_Constant.jpg",
								BriefingName: "$loc UI_CONTRACT_MAGPIE_CONSTANT_NAME",
								BriefingText: "$loc UI_CONTRACT_MAGPIE_KIDNAP_CONSTANT_OBJ",
								HUDTemplate: { display: "$loc UI_CONTRACT_MAGPIE_KIDNAP_CONSTANT_OBJ", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: {
										Start: { ActivateConstantObjective: { Transition: "SecureConstant" } },
										SecureConstant: { ConstantSecured: { Transition: "Success" } }
									}
								}
							},
							{
								_comment: "----- The Constant Escaped -----",
								Id: "5ff67d0f-9fcc-4775-ad60-364e69571388",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_MAGPIE_CONSTANT_ESCAPED_OBJ",
								HUDTemplate: { display: "$loc UI_CONTRACT_MAGPIE_CONSTANT_ESCAPED_OBJ", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: {},
									display: { iconType: 17 },
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { ConstantOnChopper: { Transition: "EscapeCountdownStart" } },
										EscapeCountdownStart: {
											BothTwinsDead: { Transition: "Success" },
											$timer: { Condition: { $after: 300 }, Transition: "Failure" }
										}
									}
								}
							}
						]
					case "LOCATION_GREEDY_RACCOON":
						return [
							{
								_comment: "----- Get McGuffin -----",
								Id: "b6dae5cd-31f7-4c81-8ccb-b0b9c58c791d",
								UpdateActivationWhileCompleted: true,
								Category: "primary",
								Primary: true,
								ObjectiveType: "custom",
								ExcludeFromScoring: true,
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/raccoon-gather-intel.jpg",
								BriefingName: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_TITLE",
								BriefingText: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_TITLE", iconType: 17 },
								Type: "statemachine",
								Scope: "session",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DYNAMIC",
														data: ["$.Core", "$.Disks"]
													}
												},
												iconType: 17
											}
										}
									},
									Context: {
										Core: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GET",
										Disks: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_0",
										Core_Get: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GET",
										Core_Got: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_CORE_GOT",
										Disk_0: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_0",
										Disk_1: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_1",
										Disk_2: "$loc UI_CONTRACT_RACCOON_OBJ_MCGUFFIN_DISK_2",
										PieceCounter: 0,
										update_counter: 0
									},
									States: {
										Start: {
											"-": { Actions: { $inc: "update_counter" } },
											DiskPieceFound: { Actions: { $inc: "PieceCounter" }, Transition: "DiskText" },
											McGuffinGotEvent: {
												Actions: { $set: ["Core", "$.Core_Got"] },
												Transition: "Success"
											}
										},
										DiskText: {
											"-": [
												{
													Condition: { $eq: ["$.PieceCounter", 0] },
													Actions: { $set: ["Disks", "$.Disk_0"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 1] },
													Actions: { $set: ["Disks", "$.Disk_1"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 2] },
													Actions: { $set: ["Disks", "$.Disk_2"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 3] },
													Actions: { $set: ["Core", ""] },
													Transition: "Success"
												},
												{ Actions: { $set: ["Core", "$.Core_Get"] }, Transition: "Start" }
											]
										},
										Success: {
											"-": { Actions: { $set: ["Disks", ""], $inc: "update_counter" } },
											McGuffinLostEvent: { Transition: "DiskText" },
											DiskPieceFound: [
												{ Actions: { $inc: "PieceCounter" } },
												{ Condition: { $eq: ["$.PieceCounter", 3] }, Transition: "DiskText" }
											]
										}
									}
								}
							},
							{
								_comment: "----- Scoring Dummy for DataCore Objective -----",
								Id: "dc87ba2d-2e2d-4a9d-9fd9-ce005345425a",
								Category: "primary",
								Primary: true,
								ObjectiveType: "custom",
								Image: "",
								BriefingName: "",
								BriefingText: "",
								Type: "statemachine",
								Scope: "session",
								Definition: { States: { Start: { exit_gate: { Transition: "Success" } } } }
							}
						]
					case "LOCATION_GOLDEN_GECKO":
						return [
							{
								_comment: "----- Marcus Stuyvesant Escape -----",
								Id: "9571d196-8d67-4d94-8dad-6e2d970d7a91",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_GECKO_FAIL_ESCAPE_MARCUS",
								HUDTemplate: { display: "$loc UI_CONTRACT_GECKO_OBJ_ESCAPE_MARCUS" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { MarcusEscapeStarted: { Transition: "Countdown" } },
										Countdown: {
											MarcusEscapeFoiled: { Transition: "Success" },
											$timer: { Condition: { $after: 20 }, Transition: "Failure" },
											Kill: {
												Condition: {
													$eq: ["$Value.RepositoryId", "88f7ec38-c083-4de0-9004-c1e4f0e4fba0"]
												},
												Transition: "Success"
											}
										}
									}
								}
							},
							{
								_comment: "----- Carl Ingram Escape -----",
								Id: "e9722da6-65e2-49b1-b951-a82efc54ea35",
								Category: "primary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								BriefingText: "$loc UI_CONTRACT_GECKO_FAIL_ESCAPE_INGRAM",
								HUDTemplate: { display: "$loc UI_CONTRACT_GECKO_OBJ_ESCAPE_INGRAM" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { "-": { Transition: "Success" } },
										Success: { IngramEscapeStarted: { Transition: "Countdown" } },
										Countdown: {
											IngramEscapeFoiled: { Transition: "Success" },
											$timer: { Condition: { $after: 20 }, Transition: "Failure" },
											Kill: {
												Condition: {
													$eq: ["$Value.RepositoryId", "bd0689d6-07b4-4757-b8ee-cac19f1c9e16"]
												},
												Transition: "Success"
											}
										}
									}
								}
							}
						]
					case "LOCATION_ANCESTRAL_BULLDOG":
						return [
							{
								_comment: "----- Find the Case File -----",
								Id: "ccb699ba-e975-40bd-aa7b-9b3c88cd6448",
								Category: "primary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/Ancestral_gather_intel.jpg",
								BriefingName: "$loc UI_CONTRACT_BULLDOG_OBJ_FILE_NAME",
								BriefingText: "$loc UI_CONTRACT_BULLDOG_OBJ_FILE_TEXT",
								LongBriefingText: "$loc UI_CONTRACT_BULLDOG_OBJ_FILE_LONG",
								HUDTemplate: { display: "$loc UI_CONTRACT_BULLDOG_OBJ_FILE_TEXT", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: {
										CaseFile: ["e5bde241-5958-496d-9d2d-39932fe93123"],
										Casepart: [
											"a7afa677-83d0-4aba-82f4-78654de07ed2",
											"79fc044c-e3cc-4f92-8402-394a1699d4c3"
										]
									},
									States: {
										Start: {
											CaseFileAcquired: { Transition: "Success" },
											BothCasePartsAcquired: { Transition: "Success" }
										}
									}
								}
							}
						]
					case "LOCATION_EDGY_FOX":
						return [
							{
								_comment: "----- Silent objective to trigger Olivia Objective -----",
								Id: "52c2496a-34e9-48da-98ce-4cf12b8e53c5",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { StartOliviaObjective: { Transition: "Success" } } }
								}
							},
							{
								_comment:
									"----- Hidden objective to check for lesser targets killed before being active -----",
								Id: "8814dcc8-cc82-47e3-9536-19211d65ec07",
								IgnoreIfInactive: true,
								UpdateActivationWhileCompleted: true,
								IsHidden: true,
								ExcludeFromScoring: true,
								Category: "primary",
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								OnActive: { IfInProgress: { Visible: false }, IfCompleted: { Visible: false } },
								Activation: { $eq: ["$52c2496a-34e9-48da-98ce-4cf12b8e53c5", "Completed"] },
								Type: "statemachine",
								Scope: "hit",
								Definition: {
									ContextListeners: {
										RemainingTargetsCount: {
											type: "objective-counter",
											header: "UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_COUNT_HEAD"
										}
									},
									Context: {
										Targets: [
											"252428ca-3f8e-4477-b2b9-58f18cff3e44",
											"abd1c0e7-e406-43bd-9185-419029c5bf3d",
											"922deccd-7fb4-45d9-ae3d-2cf11915c403",
											"b8e7e65b-587e-471b-894d-282cda6614d4",
											"2ab07903-e958-4af6-b01c-b62058745ce1",
											"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
											"633398ac-c4b4-4441-852d-ae6460172025",
											"eb024a5e-9580-49dc-a519-bb92c886f3b1",
											"1305c2e4-6394-4cfa-b873-22adbd0c9702",
											"f83376a4-6e56-4f2a-8122-151b272108fd",
											"8b29da09-461f-44d7-9042-d4fde829b9f2"
										],
										RemainingTargetsCount: 11
									},
									States: {
										Start: {
											Kill: [
												{
													Actions: { $dec: "RemainingTargetsCount" },
													Condition: {
														$inarray: {
															in: "$.Targets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												},
												{ Condition: { $eq: ["$.RemainingTargetsCount", 0] }, Transition: "Success" }
											],
											FoxTargetIdentification: [
												{ Actions: { $remove: ["Targets", "$Value.RepositoryId"] } },
												{ Condition: { $eq: ["$.RemainingTargetsCount", 0] }, Transition: "Success" }
											]
										}
									}
								}
							},
							{
								_comment: "------ First objective from default starting location: Contact Olivia Obj -----",
								Id: "be29b79d-68b5-49df-a07d-d8fe58b766e5",
								Category: "secondary",
								IgnoreIfInactive: true,
								Activation: { $eq: ["$52c2496a-34e9-48da-98ce-4cf12b8e53c5", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/fox/Fox_Contact_Olivia.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_CONTACT_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { ObjectiveOliviaFinishPt1: { Transition: "Success" } } } }
							},
							{
								_comment: "----- Second objective from default starting location: Find Olivia Obj -----",
								Id: "4402ad59-e4b2-4de5-ad58-d1fa8b163810",
								IgnoreIfInactive: true,
								Category: "secondary",
								Activation: { $eq: ["$be29b79d-68b5-49df-a07d-d8fe58b766e5", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								Image: "images/contracts/fox/Fox_Locate_Olivia.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_OBJ_OLIVIA_FIND_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { ObjectiveOliviaFinishPt2: { Transition: "Success" } } } }
							},
							{
								_comment: "----- Silent objective to trigger Pickup earpiece objective -----",
								IgnoreIfInactive: true,
								Id: "dce61868-a885-42fd-9274-d48ddb0d30aa",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { EarpieceObjectiveStart: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- Optional Objective from default starting location: Pick up earpiece -----",
								IgnoreIfInactive: true,
								Id: "2a52744b-e290-43ce-9e18-115180d3d460",
								Category: "secondary",
								Activation: { $eq: ["$dce61868-a885-42fd-9274-d48ddb0d30aa", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								Image: "images/contracts/fox/Fox_Pickup_Earpiece.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_OBJ_EARPIECE_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_OBJ_EARPIECE_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_OBJ_EARPIECE_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_OBJ_EARPIECE_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { EarpieceObjectiveComplete: { Transition: "Success" } } } }
							},
							{
								_comment: "----- DEFAULT SL: Silent Objective to trigger main objective -----",
								Id: "642e7f65-72ef-4a77-abd4-ea2d4454cd31",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { StartMainObjectives: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- OTHER SL: Silent Objective to trigger main objective -----",
								Id: "ec243189-3a89-4d6b-b1f7-958d95658e2b",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { StartMainObjective_OtherSL: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- OTHER SL:  Eliminate Agents -----",
								Id: "11d9655f-190c-4181-be5f-30cadd50dc3c",
								IgnoreIfInactive: true,
								Category: "primary",
								Activation: { $eq: ["$ec243189-3a89-4d6b-b1f7-958d95658e2b", "Completed"] },
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/fox/Fox_Eliminate_Lesser_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_TITLE" },
								Type: "statemachine",
								Scope: "session",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HUD",
														data: ["$.AgentsKilledCounter", "$.AgentsKilledGoal"]
													}
												}
											}
										}
									},
									Context: {
										Targets: [
											"252428ca-3f8e-4477-b2b9-58f18cff3e44",
											"abd1c0e7-e406-43bd-9185-419029c5bf3d",
											"922deccd-7fb4-45d9-ae3d-2cf11915c403",
											"b8e7e65b-587e-471b-894d-282cda6614d4",
											"2ab07903-e958-4af6-b01c-b62058745ce1",
											"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
											"633398ac-c4b4-4441-852d-ae6460172025",
											"eb024a5e-9580-49dc-a519-bb92c886f3b1",
											"1305c2e4-6394-4cfa-b873-22adbd0c9702",
											"f83376a4-6e56-4f2a-8122-151b272108fd",
											"8b29da09-461f-44d7-9042-d4fde829b9f2"
										],
										AgentsKilledCounter: 0,
										AgentsKilledGoal: 5,
										update_counter: 1
									},
									States: {
										Start: { StartMainObjective_OtherSL: { Transition: "CheckKills" } },
										CheckKills: {
											Kill: [
												{
													Actions: { $inc: "AgentsKilledCounter", $dec: "update_counter" },
													Condition: {
														$inarray: {
															in: "$.Targets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												},
												{ Condition: { $eq: ["$.AgentsKilledCounter", 5] }, Transition: "Success" }
											]
										}
									}
								}
							},
							{
								_comment: "----- DEFAULT SL: Eliminate Agents -----",
								Id: "47de2b7d-eae7-4d60-9987-154078ff11e9",
								IgnoreIfInactive: true,
								Category: "primary",
								Activation: { $eq: ["$642e7f65-72ef-4a77-abd4-ea2d4454cd31", "Completed"] },
								OnActive: { IfCompleted: { Visible: true } },
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/fox/Fox_Eliminate_Lesser_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_SH_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_SH_TITLE" },
								Type: "statemachine",
								Scope: "session",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_FOX_ELIMINATE_LESSER_AGENTS_HUD",
														data: ["$.AgentsKilledCounter", "$.Questionmark"]
													}
												}
											}
										}
									},
									Context: {
										Targets: [],
										Questionmark: "?",
										AgentsKilledCounter: 0,
										AgentsKilledGoal: 5,
										update_counter: 1
									},
									States: {
										Start: { StartMainObjectives: { Transition: "CheckKills" } },
										CheckKills: {
											FoxTargetIdentification: {
												Actions: { $pushunique: ["Targets", "$Value.RepositoryId"] }
											},
											Kill: [
												{
													Actions: { $inc: "AgentsKilledCounter", $dec: "update_counter" },
													Condition: { $eq: ["$Value.IsTarget", true] }
												},
												{ Condition: { $eq: ["$.AgentsKilledCounter", 5] }, Transition: "Success" }
											]
										},
										Success: {
											"-": { Actions: { $set: ["Questionmark", "5"], $dec: "update_counter" } }
										}
									}
								}
							},
							{
								_comment: "------ Explore the Compound and find ICA Agents -----",
								Id: "88921515-8ae2-4369-b089-623e60490f74",
								Category: "secondary",
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								Activation: { $eq: ["$2a52744b-e290-43ce-9e18-115180d3d460", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: { IfInProgress: { Visible: true }, IfCompleted: { Visible: false } },
								OnInactive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Image: "images/contracts/fox/Fox_Search_The_Compound.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_OBJ_FIND_AGENTS_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: { Targets: [], KilledTargets: 0, Active: true },
									States: {
										Start: {
											FoxTargetIdentification: [
												{ Actions: { $pushunique: ["Targets", "$Value.RepositoryId"] } },
												{
													Condition: { $gt: ["($.Targets).Count", "$.KilledTargets"] },
													Transition: "Success"
												}
											],
											Kill: [
												{
													Condition: { $eq: ["$Value.IsTarget", true] },
													Actions: { $inc: "KilledTargets" }
												},
												{ Condition: { $eq: ["$.KilledTargets", 5] }, Transition: "Success" }
											]
										},
										Success: {
											Kill: [
												{
													Condition: { $eq: ["$Value.IsTarget", true] },
													Actions: { $inc: "KilledTargets" }
												},
												{
													Condition: { $eq: ["$.KilledTargets", 5] },
													Actions: { $set: ["Active", false] }
												},
												{
													Condition: {
														$and: [
															{ $le: ["($.Targets).Count", "$.KilledTargets"] },
															{ $eq: ["$.Active", true] }
														]
													},
													Transition: "Start"
												}
											],
											FoxTargetIdentification: {
												Actions: { $pushunique: ["Targets", "$Value.RepositoryId"] }
											}
										}
									}
								}
							},
							{
								_comment:
									"----- Invisible Seconday: Eliminate Lesser Agents. Allow us to kill stragglers -----",
								Id: "7e74ccd4-5070-4bfd-b9b0-b7fe5ecb8ab9",
								Category: "secondary",
								IsHidden: true,
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Activation: {
									$or: [
										{ $eq: ["$47de2b7d-eae7-4d60-9987-154078ff11e9", "Completed"] },
										{ $eq: ["$11d9655f-190c-4181-be5f-30cadd50dc3c", "Completed"] }
									]
								},
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								Image: "images/contracts/whitespider/003_rabies/Rabies_Eliminate_Infected_Obj.jpg",
								BriefingName: "$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_TITLE",
								BriefingText: "$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_DESC",
								HUDTemplate: { display: "$loc UI_CONTRACT_FOX_ELIMINATE_REMAINING_LESSER_AGENTS_OBJ" },
								Type: "statemachine",
								Scope: "hit",
								Definition: {
									Context: {
										Targets: [
											"252428ca-3f8e-4477-b2b9-58f18cff3e44",
											"abd1c0e7-e406-43bd-9185-419029c5bf3d",
											"922deccd-7fb4-45d9-ae3d-2cf11915c403",
											"b8e7e65b-587e-471b-894d-282cda6614d4",
											"2ab07903-e958-4af6-b01c-b62058745ce1",
											"28cb7e91-bf9c-46ee-a371-1bd1448f1994",
											"633398ac-c4b4-4441-852d-ae6460172025",
											"eb024a5e-9580-49dc-a519-bb92c886f3b1",
											"1305c2e4-6394-4cfa-b873-22adbd0c9702",
											"8b29da09-461f-44d7-9042-d4fde829b9f2",
											"f83376a4-6e56-4f2a-8122-151b272108fd"
										],
										RemainingTargetsCount: 10
									},
									States: {
										Start: {
											Kill: [
												{
													Actions: { $dec: "RemainingTargetsCount" },
													Condition: {
														$inarray: {
															in: "$.Targets",
															"?": { $eq: ["$.#", "$Value.RepositoryId"] }
														}
													}
												},
												{ Condition: { $eq: ["$.RemainingTargetsCount", 0] }, Transition: "Success" }
											]
										}
									}
								}
							}
						]
					case "LOCATION_WET_RAT":
						return [
							{
								_comment: "----- START VETTING HACK COUNTDOWN -----",
								Id: "5dc023cb-083f-49e5-8c42-1f0f47f56700",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { StartVettingTimer: { Transition: "Failure" } } }
								}
							},
							{
								Activation: { $eq: ["$5dc023cb-083f-49e5-8c42-1f0f47f56700", "Failed"] },
								_comment: "----- VETTING HACK PUZZLE -----",
								Id: "620db22d-ff0f-46d2-9c99-3fcca69c6586",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false }, IfFailed: { Visible: false } },
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_VETTING" },
								Type: "statemachine",
								Definition: {
									Context: {},
									States: {
										Start: { StartVettingTimer: { Transition: "VettingTimer" } },
										VettingTimer: {
											VettingSuccessful: { Transition: "Success" },
											$timer: { Condition: { $after: 57 }, Transition: "Failure" }
										}
									}
								}
							},
							{
								_comment: "Activates Data Core OPTIONAL Objectives",
								Id: "52e024e8-26b8-4cb2-8f17-93e649a33c95",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: { IfFailed: { Visible: false }, IfInProgress: { Visible: false } },
								Definition: {
									Constants: { Goal: 2 },
									Context: { Count: 0 },
									States: {
										Start: {
											DefaultStartingLocation: { Transition: "Failure" },
											Kill: [
												{
													Condition: { $eq: ["$Value.IsTarget", true] },
													Actions: { $inc: "Count" }
												},
												{ Condition: { $eq: ["$.Count", "$.Goal"] }, Transition: "Success" }
											]
										}
									}
								}
							},
							{
								_comment: "Get Data [OPTIONAL]",
								Id: "851cfa2a-874d-4374-8f3e-74379ce429e6",
								Category: "secondary",
								Type: "statemachine",
								Activation: { $eq: ["$52e024e8-26b8-4cb2-8f17-93e649a33c95", "Completed"] },
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								ExcludeFromScoring: true,
								ObjectiveType: "setpiece",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_OPTIONAL",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_OPTIONAL", iconType: 17 },
								Definition: {
									Context: { Targets: ["f9c04811-11e8-464d-9222-d79a636cebf3"] },
									States: { Start: { DataGot: { Transition: "Success" } } }
								}
							},
							{
								_comment: "Get Data - Primary - Invisible ",
								Id: "6a631726-5bd4-4e06-84a0-56c805c4ab92",
								Category: "primary",
								ExcludeFromScoring: true,
								IsHidden: true,
								IgnoreIfInactive: true,
								Activation: { $eq: ["$8283ba19-13db-4f34-a27d-228a275a4f48", "Completed"] },
								OnActive: { IfInProgress: { Visible: false }, IfCompleted: { Visible: false } },
								OnInactive: { IfInProgress: { Visible: false }, IfCompleted: { Visible: false } },
								ObjectiveType: "custom",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03", iconType: 17 },
								Type: "statemachine",
								Definition: {
									Context: { OneTime: true },
									States: {
										Start: { "-": { Transition: "Success" } },
										Active: {
											DataGot: { Actions: { $set: ["OneTime", false] }, Transition: "Success" }
										},
										Success: {
											DefaultStartingLocation: {
												Condition: { $eq: ["$.OneTime", true] },
												Transition: "Active"
											}
										}
									}
								}
							},
							{
								_comment: "Activates Data Core Objectives",
								Id: "8283ba19-13db-4f34-a27d-228a275a4f48",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { DefaultStartingLocation: { Transition: "Success" } } }
								}
							},
							{
								_comment: "Get Data - No Targets Killed",
								Id: "c75bb683-781d-41aa-be06-264083a8d658",
								Category: "secondary",
								Type: "statemachine",
								Activation: { $eq: ["$8283ba19-13db-4f34-a27d-228a275a4f48", "Completed"] },
								OnActive: { IfCompleted: { Visible: false } },
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_UNAVAILABLE",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_01", iconType: 17 },
								Definition: {
									States: {
										Start: {
											Kill: { Condition: { $eq: ["$Value.IsTarget", true] }, Transition: "Success" }
										}
									}
								}
							},
							{
								_comment: "Get Data - 1 Targets Killed",
								Id: "6debc7f2-d4f8-4be5-88ce-e09af4821a78",
								Category: "secondary",
								Type: "statemachine",
								Activation: {
									$eq: [
										"$c75bb683-781d-41aa-be06-264083a8d658",
										"$8283ba19-13db-4f34-a27d-228a275a4f48",
										"Completed"
									]
								},
								OnActive: { IfCompleted: { Visible: false } },
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								ExcludeFromScoring: true,
								ObjectiveType: "custom",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_UNAVAILABLE",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_02", iconType: 17 },
								Definition: {
									Constants: { Goal: 2 },
									Context: { Count: 0 },
									States: {
										Start: {
											Kill: [
												{
													Condition: { $eq: ["$Value.IsTarget", true] },
													Actions: { $inc: "Count" }
												},
												{ Condition: { $eq: ["$.Count", "$.Goal"] }, Transition: "Success" }
											]
										}
									}
								}
							},
							{
								_comment: "Get Data - All Targets Killed",
								Id: "63c0b383-a72f-4591-95ce-453a0152863e",
								Category: "secondary",
								Type: "statemachine",
								Activation: {
									$eq: [
										"$8283ba19-13db-4f34-a27d-228a275a4f48",
										"$6debc7f2-d4f8-4be5-88ce-e09af4821a78",
										"Completed"
									]
								},
								OnInactive: {
									IfCompleted: { State: "Completed", Visible: false },
									IfInProgress: { Visible: false }
								},
								ExcludeFromScoring: true,
								ObjectiveType: "setpiece",
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_TITLE_03", iconType: 17 },
								Definition: {
									Context: { Targets: ["f9c04811-11e8-464d-9222-d79a636cebf3"] },
									States: { Start: { DataGot: { Transition: "Success" } } }
								}
							},
							{
								Id: "f4afd898-9270-4e3a-9a26-326172760a01",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { ShowDataObjectiveSecond: { Transition: "Success" } } }
								}
							},
							{
								_comment: "----- Get Data Second Playthrough -----",
								Id: "8281663a-3787-42ab-ada1-6048757529a4",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnInactive: { IfCompleted: { State: "Completed", Visible: false } },
								Activation: { $eq: ["$f4afd898-9270-4e3a-9a26-326172760a01", "Completed"] },
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								Image: "Images/Contracts/Rat/rat_objective.jpg",
								BriefingName: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_OPTIONAL_TITLE",
								BriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_DESC",
								LongBriefingText: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_RAT_OBJ_DATACORE_OPTIONAL_TITLE", iconType: 17 },
								Type: "statemachine",
								Definition: { States: { Start: { CompleteDataObjectiveSecond: { Transition: "Success" } } } }
							}
						]
					case "LOCATION_ELEGANT_LLAMA":
						return [
							{
								_comment: "----- Find Diana Burnwood -----",
								Id: "fdd987fd-20e2-42f8-a28a-6420584be50c",
								Primary: true,
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								Image: "images/actors/Llama_Diana_Burnwood.jpg",
								BriefingName: "$loc UI_CONTRACT_LLAMA_DIANA_FIND_NAME",
								BriefingText: "$loc UI_CONTRACT_LLAMA_DIANA_FIND_OBJ",
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_DIANA_FIND_NAME", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: {
										Start: {
											Diana_Fail: { Transition: "Failure" },
											Diana_Find_Completed: { Transition: "Success" }
										}
									}
								},
								Category: "primary"
							},
							{
								_comment: "----- Do Not Eliminate Diana Burnwood -----",
								Id: "ffaa1229-2fd3-4a93-87ca-974122e2a25f",
								Primary: true,
								Activation: { $eq: ["$fdd987fd-20e2-42f8-a28a-6420584be50c", "Completed"] },
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: true,
								ExcludeFromScoring: true,
								OnActive: { IfCompleted: { Visible: false } },
								Image: "images/actors/Llama_Diana_Burnwood.jpg",
								BriefingName: "$loc UI_CONTRACT_LLAMA_DIANA_NAME",
								BriefingText: "$loc UI_CONTRACT_LLAMA_DIANA_NAME",
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_DIANA_NAME", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: { Start: { Diana_Extract_Start: { Transition: "Success" } } }
								},
								Category: "primary"
							},
							{
								_comment: "----- Do Not Eliminate Diana Burnwood Dummy -----",
								Id: "636aef3d-3c15-4a5f-882a-d04a19ebbc7c",
								Primary: true,
								Activation: { $eq: ["$fdd987fd-20e2-42f8-a28a-6420584be50c", "Completed"] },
								ObjectiveType: "custom",
								ForceShowOnLoadingScreen: false,
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Image: "images/actors/Llama_Diana_Burnwood.jpg",
								BriefingName: "$loc UI_CONTRACT_LLAMA_DIANA_NAME",
								BriefingText: "$loc UI_CONTRACT_LLAMA_DIANA_NAME",
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_DIANA_NAME", iconType: 17 },
								Type: "statemachine",
								Definition: {
									display: { iconType: 17 },
									Scope: "session",
									States: { Start: { Diana_Fail: { Transition: "Failure" } } }
								},
								Category: "primary"
							},
							{
								Id: "76c66acd-18d7-4f93-b74f-95a6bea515d8",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: true },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { DianaMurderStarted: { Transition: "Failure" } } }
								}
							},
							{
								Activation: { $eq: ["$76c66acd-18d7-4f93-b74f-95a6bea515d8", "Failed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_TIMER_DIANAMURDER" },
								Id: "f92b9623-6cb5-44cb-b9a2-bf483a3bfe1d",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_HAWK_TIMER_TIMED_OUT", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { BeginTimer: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 600 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											},
											EndTimer: { Transition: "Failure" },
											SuccessTimer: { Transition: "Success" }
										}
									}
								}
							},
							{
								_comment: "----- Dormant Laser Timer 1 -----",
								Id: "1420233f-fb30-4d9d-b8b3-bf97231e526b",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { LASER_TIMER_ACTIVATE: { Transition: "Success" } } }
								}
							},
							{
								Activation: { $eq: ["$1420233f-fb30-4d9d-b8b3-bf97231e526b", "Completed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE" },
								_comment: "----- LASER TIMER 1 -----",
								Id: "01d97de2-bb2a-42b7-93c1-ea29c60bfd9b",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_LLAMA_LASERTIMER1", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { LASER_TIMER_ON: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 60 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											}
										}
									}
								}
							},
							{
								_comment: "----- Dormant Laser Timer 2 -----",
								Id: "701a1d42-b317-4103-bd74-a01f19920eab",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { LASER_TIMER2_ACTIVATE: { Transition: "Success" } } }
								}
							},
							{
								Activation: { $eq: ["$701a1d42-b317-4103-bd74-a01f19920eab", "Completed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE" },
								_comment: "----- LASER TIMER 1 -----",
								Id: "d3098d33-247a-4849-8ce2-fb6b9a2850ed",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_LLAMA_LASERTIMER2", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { LASER_TIMER2_ON: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 60 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											}
										}
									}
								}
							},
							{
								_comment: "----- Dormant Laser Timer 3 -----",
								Id: "0662c9ff-dee3-44cf-ab2b-761eb970936a",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: false },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { LASER_TIMER3_ACTIVATE: { Transition: "Success" } } }
								}
							},
							{
								Activation: { $eq: ["$0662c9ff-dee3-44cf-ab2b-761eb970936a", "Completed"] },
								HUDTemplate: { display: "$loc UI_CONTRACT_LLAMA_LASERTIMER_TITLE" },
								_comment: "----- LASER TIMER 3 -----",
								Id: "c3e9ad3e-b913-4d7d-85ad-ad538141778c",
								Scope: "session",
								Type: "statemachine",
								Category: "secondary",
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfFailed: { Visible: false },
									IfCompleted: { Visible: false }
								},
								Definition: {
									ContextListeners: {
										Timeout: {
											type: "custom",
											HUDTemplate: {
												display: { $loc: { key: "UI_CONTRACT_LLAMA_LASERTIMER3", data: [] } }
											}
										}
									},
									Context: { Timeout: 1 },
									States: {
										Start: { LASER_TIMER3_ON: { Transition: "TimerRunning" } },
										TimerRunning: {
											$timer: {
												Condition: { $after: 60 },
												Actions: { $dec: "Timeout" },
												Transition: "Failure"
											}
										}
									}
								}
							}
						]
					case "LOCATION_TRAPPED_WOLVERINE":
						return [
							{
								_comment: "-----UI text objective for Eliminate any Providence NPC -----",
								Id: "efb1da8a-c282-4b6f-bc1a-7efea39e1421",
								Category: "secondary",
								Activation: { $eq: ["$c458f79e-f308-49d9-8491-854e04aaeecb", "Completed"] },
								ExcludeFromScoring: true,
								OnActive: {
									IfInProgress: { Visible: true },
									IfCompleted: { Visible: false },
									IfFailed: { Visible: false }
								},
								ObjectiveType: "custom",
								Type: "statemachine",
								Scope: "session",
								Image: "images/contracts/wolverine/wolverine_providence_logo_obj.jpg",
								BriefingName: "$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_TITLE",
								BriefingText: "$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_HEADER",
								LongBriefingText: "$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_DESC",
								HUDTemplate: {
									display: "$loc UI_CONTRACT_WOLVERINE_ELIMINATE_PROVIDENCE_TITLE",
									iconType: 17
								},
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { RemoveOptionalObjective: [{ Transition: "Success" }] } }
								}
							},
							{
								_comment: "----- Objective hider -----",
								Id: "c458f79e-f308-49d9-8491-854e04aaeecb",
								Type: "statemachine",
								Category: "condition",
								ExcludeFromScoring: true,
								Definition: {
									Scope: "session",
									Context: {},
									States: { Start: { EnableObjective: { Transition: "Success" } } }
								}
							}
						]
					case "LOCATION_ROCKY_DUGONG":
						return [
							{
								_comment: "----- Get McGuffin OR destroy satellite link -----",
								Id: "3a71e4b6-6de1-4cc7-8e21-02970fdb1b3a",
								UpdateActivationWhileCompleted: true,
								Category: "primary",
								Primary: true,
								ObjectiveType: "custom",
								ExcludeFromScoring: true,
								ForceShowOnLoadingScreen: true,
								Image: "images/actors/Rocky_Destroy_McGuffin.jpg",
								BriefingName: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_TITLE",
								BriefingText: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_DESC",
								LongBriefingText: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_BRIEFING",
								HUDTemplate: { display: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_TITLE", iconType: 17 },
								Type: "statemachine",
								Scope: "session",
								Definition: {
									ContextListeners: {
										update_counter: {
											type: "custom",
											HUDTemplate: {
												display: {
													$loc: {
														key: "UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_DYNAMIC",
														data: ["$.Core", "$.Disks"]
													}
												},
												iconType: 17
											}
										}
									},
									Context: {
										Core: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROY",
										Disks: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_0",
										Core_Get: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROY",
										Core_Got: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_CONTROLS_DESTROYED",
										Disk_0: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_0",
										Disk_1: "$loc UI_CONTRACT_DUGONG_OBJ_MCGUFFIN_KEY_1",
										PieceCounter: 0,
										update_counter: 0
									},
									States: {
										Start: {
											"-": { Actions: { $inc: "update_counter" } },
											KeyPieceFound: { Actions: { $inc: "PieceCounter" }, Transition: "DiskText" },
											McGuffinDestroyedEvent: {
												Actions: { $set: ["Core", "$.Core_Got"] },
												Transition: "Success"
											}
										},
										DiskText: {
											"-": [
												{
													Condition: { $eq: ["$.PieceCounter", 0] },
													Actions: { $set: ["Disks", "$.Disk_0"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 1] },
													Actions: { $set: ["Disks", "$.Disk_1"] }
												},
												{
													Condition: { $eq: ["$.PieceCounter", 2] },
													Actions: { $set: ["Core", ""] },
													Transition: "Success"
												},
												{ Actions: { $set: ["Core", "$.Core_Get"] }, Transition: "Start" }
											]
										},
										Success: {
											"-": { Actions: { $set: ["Disks", ""], $inc: "update_counter" } },
											KeyPieceFound: [
												{ Actions: { $inc: "PieceCounter" } },
												{ Condition: { $eq: ["$.PieceCounter", 2] }, Transition: "DiskText" }
											]
										}
									}
								}
							},
							{
								_comment: "----- Scoring Dummy for DataCore Objective -----",
								Id: "e4b13eee-c90d-40ef-9ced-720d0b209721",
								Category: "primary",
								Primary: true,
								ObjectiveType: "custom",
								Image: "",
								BriefingName: "",
								BriefingText: "",
								Type: "statemachine",
								Scope: "session",
								Definition: { States: { Start: { exit_gate: { Transition: "Success" } } } }
							}
						]
				}
			}

			if (selectedMission == "LOCATION_ELEGANT_LLAMA") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$ffaa1229-2fd3-4a93-87ca-974122e2a25f", "Completed")
				}
			} else if (selectedMission == "LOCATION_GREEDY_RACCOON") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$b6dae5cd-31f7-4c81-8ccb-b0b9c58c791d", "Completed")
				}
			} else if (selectedMission == "LOCATION_COASTALTOWN") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$e15b5171-2b12-4966-9339-3344042f9867", "Completed")
				}
			} else if (selectedMission == "LOCATION_COASTALTOWN_EBOLA") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$f6d7ccfd-6f0b-4e01-b80f-982c051c4c8e", "Completed")
				}
			} else if (selectedMission == "LOCATION_MARRAKECH_NIGHT") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$341c93cc-05b5-45df-8b32-17ffa44e29ac", "Completed")
				}
			} else if (selectedMission == "LOCATION_HOKKAIDO_FLU") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$b8ffc636-4f9a-49b5-8293-98839a6ca202", "Completed")
				}
			} else if (selectedMission == "LOCATION_COLOMBIA_ANACONDA") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$d61d68e2-1e72-4c50-9c65-f2106ae30a9d", "Completed")
				}
			} else if (selectedMission == "LOCATION_NORTHAMERICA") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$369dd2f7-acfa-4c51-b03d-dbbb4bb863ac", "Completed")
				}
			} else if (selectedMission == "LOCATION_ANCESTRAL_BULLDOG") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$ccb699ba-e975-40bd-aa7b-9b3c88cd6448", "Completed")
				}
			} else if (selectedMission == "LOCATION_ROCKY_DUGONG") {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("$3a71e4b6-6de1-4cc7-8e21-02970fdb1b3a", "Completed")
				}
			} else if (selectedMission == "LOCATION_EDGY_FOX") {
				baseContract.Data["EnableExits"] = {
					$or: [
						{
							$eq: ["$47de2b7d-eae7-4d60-9987-154078ff11e9", "Completed"]
						},
						{
							$eq: ["$11d9655f-190c-4181-be5f-30cadd50dc3c", "Completed"]
						}
					]
				}
			} else {
				baseContract.Data["EnableExits"] = {
					$eq: objectiveIdList.concat("Completed")
				}
			}

			// Easter egg: why in the hell are you reading through this mess of a plugin? Are you a masochist or something?

			baseContract.Data.Objectives.push.apply(baseContract.Data.Objectives, additionalObjectives(selectedMission))

			baseContract.RouletteSeed = seed
			if (selectedMission == "LOCATION_ICA_FACILITY_SHIP") {
				baseContract.Data.MandatoryLoadout = [
					{
						Id: "FIREARMS_HERO_PISTOL_TACTICAL_ICA_19",
						Properties: { LoadoutSlot: "concealedweapon", RepositoryId: "73875794-5a86-410e-84a4-1b5b2f7e5a54" }
					},
					{
						Id: "Melee_FiberWire_Descriptor",
						Properties: { LoadoutSlot: "gear", RepositoryId: "1a11a060-358c-4054-98ec-d3491af1d7c6" }
					}
				]
			} else if (selectedMission == "LOCATION_ICA_FACILITY") {
				baseContract.Data.MandatoryLoadout = [
					{
						Id: "FIREARMS_HERO_PISTOL_TACTICAL_ICA_19",
						Properties: { LoadoutSlot: "concealedweapon", RepositoryId: "73875794-5a86-410e-84a4-1b5b2f7e5a54" }
					},
					{
						Id: "Melee_FiberWire_Descriptor",
						Properties: { LoadoutSlot: "gear", RepositoryId: "1a11a060-358c-4054-98ec-d3491af1d7c6" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					},
					{
						Id: "Tool_Coin",
						Properties: { LoadoutSlot: "gear", RepositoryId: "dda002e9-02b1-4208-82a5-cf059f3c79cf" }
					}
				]
			}

			controller.addMission(baseContract)

			ids.push(contractId)

			require("node:fs").writeFileSync("out.json", JSON.stringify(baseContract))
		}
	})
}
