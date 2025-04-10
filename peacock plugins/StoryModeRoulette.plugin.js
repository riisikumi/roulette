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
							Image: "images/contracts/gamechangers/gamechanger_global_nopacifications.jpg",
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

				const exitObjectiveId = randomUUID()

				const exitObjective = [{"Type":"statemachine","Id":exitObjectiveId,"ObjectiveType":"custom","Category":"secondary","Exits":[selectedExit],"BriefingName":"$loc UI_CONTRACT_UGC_REQUIRED_EXIT_NAME","BriefingText":{$loc:{key:"UI_ROULETTE_EXIT_DESC",data:[exitString]}},"LongBriefingText":{$loc:{key:"UI_ROULETTE_EXIT_DESC",data:[exitString]}},"HUDTemplate":{"display":{$loc:{key:"UI_ROULETTE_EXIT_DESC",data:[exitString]}},"iconType":7},"Image":"images/contractconditions/condition_contrac_required_exit.jpg","ShowInHud":true,"ExcludeFromScoring":true,"Definition":{"Scope":"session","Context":{"Exited":false,"LastItemDroppedTime":0,"LastKillTime":0},"States":{"Start":{"-":[{"Transition":"Success"}]},"Success":{"exit_gate":[{"Actions":{"$set":["Exited",true]}}],"TaxiDriverDistracted":[{"Actions":{"$set":["LastItemDroppedTime","$Timestamp"]}}],"Kill":[{"Actions":{"$set":["LastKillTime","$Timestamp"]}}],"ItemDropped":[{"Actions":{"$set":["LastItemDroppedTime","$Timestamp"]}}],"ExitInventory":[{"Actions":{"$set":["LastItemDroppedTime","$Timestamp"]}}],"ItemRemovedFromInventory":[{"Actions":{"$set":["LastItemDroppedTime","$Timestamp"]}}],"ItemThrown":[{"Actions":{"$set":["LastItemDroppedTime","$Timestamp"]}}],"ExitDisabled":[{"Condition":{"$or":[{"$and":[{"$eq":["$Value",selectedExit]},{"$eq":["$.Exited",false]},{"$not":{"$eq":["$.LastItemDroppedTime","$Timestamp"]}}]},{"$eq":["$.LastKillTime","$Timestamp"]}]},"Transition":"Failure"}]}}}}]

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
