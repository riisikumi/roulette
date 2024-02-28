const { log, LogLevel } = require("@peacockproject/core/loggingInterop");

// Define the contracts JSON data
const contracts = [
    {
        "Data": {
            "Objectives": [
                {
                    "Id": "bffa7478-8100-480d-8207-1e5650291012",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                },
                {
                    "Id": "bffa7478-8100-480d-8227-1e5650291012",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                },
            ],
            "Bricks": [
                "assembly:/_PRO/Scenes/Missions/TheFacility/createcontract_module_002_b.brick"
            ],
            "VR": [
                {
                    "Quality": "base",
                    "Bricks": [
                        "assembly:/_pro/Scenes/Bricks/vr_setup.brick",
                        "assembly:/_pro/scenes/missions/thefacility/vr_overrides_polarbear002_base.brick",
                        "assembly:/_pro/scenes/missions/thefacility/vr_overrides_polarbear002_ps4perf.brick"
                    ]
                }
            ],
            "GameChangers": ["834a20cc-7cfc-4ec3-8858-c3a213e3de56"],
            "MandatoryLoadout": [
                {
                    "Id": "FIREARMS_HERO_PISTOL_TACTICAL_ICA_19",
                    "Properties": {
                        "LoadoutSlot": "concealedweapon",
                        "RepositoryId": "73875794-5a86-410e-84a4-1b5b2f7e5a54"
                    }
                },
                {
                    "Id": "Melee_FiberWire_Descriptor",
                    "Properties": {
                        "LoadoutSlot": "gear",
                        "RepositoryId": "1a11a060-358c-4054-98ec-d3491af1d7c6"
                    }
                }
            ],
            "RecommendedLoadout": []
        },
        "Metadata": {
            "Id": "d7a06eeb-8353-4f1a-af51-4ff5c2f26e7d",
            "IsPublished": true,
            "CreationTimestamp": "2015-07-02T13:18:30.1639035Z",
            "CreatorUserId": "fadb923c-e6bb-4283-a537-eb4d1150262e",
            "InGroup": "9c2bbf25-158c-445d-bec9-b1875a5c23b9",
            "Title": "RR_EZ",
            "Description": "Random Roulette Complication Mode Freeform Training Easy",
            "TileImage": "images/contracts/polarbear/module_002_b/tile.jpg",
            "CodeName_Hint": "Polarbear Module 002_B",
            "ScenePath": "assembly:/_PRO/Scenes/Missions/TheFacility/_Scene_Mission_Polarbear_Module_002_B.entity",
            "Location": "LOCATION_ICA_FACILITY_SHIP",
            "LastUpdate": "2021-03-16T13:07:47.7883561Z",
            "Type": "escalation",
            "Release": "1.0.x",
            "RequiredUnlockable": "ACCESS_HIT_POLARBEAR_MODULE_002B",
            "Drops": ["ACCESS_HIT_POLARBEAR_GRADUATION"],
            "PublicId": "099348042247"
        },
        "UserData": {}
    },
    {
        "Data": {
            "Objectives": [
                {
                    "Id": "bffa7478-8100-480d-8207-1e5650291012",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                },
                {
                    "Id": "bffa7478-8100-480d-8207-1e5650291112",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                },
                {
                    "Id": "bffa7438-8100-480d-8207-1e5650291012",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                },
            ],
            "Bricks": [
                "assembly:/_PRO/Scenes/Missions/TheFacility/createcontract_module_002_b.brick"
            ],
            "VR": [
                {
                    "Quality": "base",
                    "Bricks": [
                        "assembly:/_pro/Scenes/Bricks/vr_setup.brick",
                        "assembly:/_pro/scenes/missions/thefacility/vr_overrides_polarbear002_base.brick",
                        "assembly:/_pro/scenes/missions/thefacility/vr_overrides_polarbear002_ps4perf.brick"
                    ]
                }
            ],
            "GameChangers": ["834a20cc-7cfc-4ec3-8858-c3a213e3de56"],
            "MandatoryLoadout": [
                {
                    "Id": "FIREARMS_HERO_PISTOL_TACTICAL_ICA_19",
                    "Properties": {
                        "LoadoutSlot": "concealedweapon",
                        "RepositoryId": "73875794-5a86-410e-84a4-1b5b2f7e5a54"
                    }
                },
                {
                    "Id": "Melee_FiberWire_Descriptor",
                    "Properties": {
                        "LoadoutSlot": "gear",
                        "RepositoryId": "1a11a060-358c-4054-98ec-d3491af1d7c6"
                    }
                }
            ],
            "RecommendedLoadout": []
        },
        "Metadata": {
            "Id": "d7a06eeb-8353-411a-af51-4ff5c2f26e7d",
            "IsPublished": true,
            "CreationTimestamp": "2015-07-02T13:18:30.1639035Z",
            "CreatorUserId": "fadb923c-e6bb-4283-a537-eb4d1150262e",
            "InGroup": "9c2bbf25-158c-445d-bec9-b1875a5c23b9",
            "Title": "RR_MID",
            "Description": "Random Roulette Complication Mode Freeform Training Medium",
            "TileImage": "images/contracts/polarbear/module_002_b/tile.jpg",
            "CodeName_Hint": "Polarbear Module 002_B",
            "ScenePath": "assembly:/_PRO/Scenes/Missions/TheFacility/_Scene_Mission_Polarbear_Module_002_B.entity",
            "Location": "LOCATION_ICA_FACILITY_SHIP",
            "LastUpdate": "2021-03-16T13:07:47.7883561Z",
            "Type": "escalation",
            "Release": "1.0.x",
            "RequiredUnlockable": "ACCESS_HIT_POLARBEAR_MODULE_002B",
            "Drops": ["ACCESS_HIT_POLARBEAR_GRADUATION"],
            "PublicId": "099348042247"
        },
        "UserData": {}
    },
    {
        "Data": {
            "Objectives": [
                {
                    "Id": "bffa7478-8100-480d-8207-1e1650291012",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                },
                {
                    "Id": "bffa7478-8100-480d-8207-1e5650391012",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                },
                {
                    "Id": "bffa7478-8100-480d-8207-1e5654291012",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                },
                {
                    "Id": "bffa7478-8100-480d-8207-1e5650291012",
                    "Primary": true,
                    "SuccessEvent": {
                        "EventName": "Kill",
                        "EventValues": {
                            "RepositoryId": "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb"
                        }
                    },
                    "ResetEvent": null,
                    "FailedEvent": null
                }
            ],
            "Bricks": [
                "assembly:/_PRO/Scenes/Missions/TheFacility/createcontract_module_002_b.brick"
            ],
            "VR": [
                {
                    "Quality": "base",
                    "Bricks": [
                        "assembly:/_pro/Scenes/Bricks/vr_setup.brick",
                        "assembly:/_pro/scenes/missions/thefacility/vr_overrides_polarbear002_base.brick",
                        "assembly:/_pro/scenes/missions/thefacility/vr_overrides_polarbear002_ps4perf.brick"
                    ]
                }
            ],
            "GameChangers": ["834a20cc-7cfc-4ec3-8858-c3a213e3de56"],
            "MandatoryLoadout": [
                {
                    "Id": "FIREARMS_HERO_PISTOL_TACTICAL_ICA_19",
                    "Properties": {
                        "LoadoutSlot": "concealedweapon",
                        "RepositoryId": "73875794-5a86-410e-84a4-1b5b2f7e5a54"
                    }
                },
                {
                    "Id": "Melee_FiberWire_Descriptor",
                    "Properties": {
                        "LoadoutSlot": "gear",
                        "RepositoryId": "1a11a060-358c-4054-98ec-d3491af1d7c6"
                    }
                }
            ],
            "RecommendedLoadout": []
        },
        "Metadata": {
            "Id": "d7a06eeb-8353-411a-af51-4ff5c2f26e76",
            "IsPublished": true,
            "CreationTimestamp": "2015-07-02T13:18:30.1639035Z",
            "CreatorUserId": "fadb923c-e6bb-4283-a537-eb4d1150262e",
            "InGroup": "9c2bbf25-158c-445d-bec9-b1875a5c23b9",
            "Title": "RR_HARD",
            "Description": "Random Roulette Complication Mode Freeform Training Hard",
            "TileImage": "images/contracts/polarbear/module_002_b/tile.jpg",
            "CodeName_Hint": "Polarbear Module 002_B",
            "ScenePath": "assembly:/_PRO/Scenes/Missions/TheFacility/_Scene_Mission_Polarbear_Module_002_B.entity",
            "Location": "LOCATION_ICA_FACILITY_SHIP",
            "LastUpdate": "2021-03-16T13:07:47.7883561Z",
            "Type": "escalation",
            "Release": "1.0.x",
            "RequiredUnlockable": "ACCESS_HIT_POLARBEAR_MODULE_002B",
            "Drops": ["ACCESS_HIT_POLARBEAR_GRADUATION"],
            "PublicId": "099348042247"
        },
        "UserData": {}
    },
    // Add more contracts as needed
];

// Define the escalations JSON data
const escalations = [
    {
        "Data": {
            "EnableSaving": false,
            "Objectives": [],
            "Bricks": [],
            "GameChangers": []
        },
        "Metadata": {
            "Id": "9c2bbf25-158c-445d-bec9-b1875a5c23b9",
            "IsPublished": true,
            "CreationTimestamp": "2015-11-26T15:00:06.36Z",
            "CreatorUserId": "fadb923c-e6bb-4283-a537-eb4d1150262e",
            "Title": "RR_COMP",
            "Description": "UI_CONTRACT_SNOWDROP_GROUP_DESC",
            "CodeName_Hint": "Snowdrop Group",
            "TileImage": "images/Contracts/RandomRoulette/FF-C.png",
            "Location": "LOCATION_ICA_FACILITY_SHIP",
            "RequiredUnlockable": "ACCESS_HIT_POLARBEAR_MODULE_002B",
            "ScenePath": "assembly:/_pro/scenes/missions/thefacility/_scene_mission_polarbear_002_for_escalation_.entity",
            "GroupDefinition": {
                "Type": "escalation",
                "Order": [
                    "d7a06eeb-8353-4f1a-af51-4ff5c2f26e7d",
                    "d7a06eeb-8353-411a-af51-4ff5c2f26e7d",
                    "d7a06eeb-8353-411a-af51-4ff5c2f26e76"
                ]
            },
            "Type": "escalation",
            "Release": "1.0.x Escalation",
            "LastUpdate": "2020-11-09T13:35:25.5078466Z",
            "PublicId": "001479819747",
            "Entitlements": ["H1_LEGACY_STANDARD"],
            "Season": 1
        },
        "UserData": {}
    }
];

// Array of possible GameChanger IDs
const possibleGameChangers = [
    "113ba9e8-4fa5-4ab0-b613-05b97e39e600", // UI_GAMECHANGERS_GLOBAL_NO_AGILITY_NAME
    "da07626c-0aa3-463a-92ff-8e7adbbf6230", // UI_GAMECHANGERS_GLOBAL_NO_UNCONSCIOUS_NAME
    "07b1bc1d-f52b-4004-a760-846c4bc3f172", // UI_GAMECHANGERS_GLOBAL_NO_DISGUISE_CHANGE_NAME
    "63055f1a-bcd2-4e0f-8caf-b446f01d02f3", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_DISGUISE_CHANGES_PRIMARY_NAME
    "c2da52c5-ff3e-41cd-a175-4ed9267f6c95", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_HIDE_ALL_BODIES_PRIMARY_NAME
    "9f409781-0a06-4748-b08d-784e78c6d481", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_DO_NOT_GET_SPOTTED_PRIMARY_NAME
    "03ca23e8-7daf-4346-8719-29970bc50d17", // UI_GAMECHANGERS_GLOBAL_NO_NON_TARGET_CIVILIAN_PACIFICATION_OR_KILLS_NAME
    "f41f18fe-0fe5-416a-a793-50727e594655", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_TARGETS_ONLY_PRIMARY_NAME
    "576b385f-2213-4f72-a17c-c346338d3d9f", // UI_GAMECHANGERS_GLOBAL_COMPLETE_MISSION_WITHIN_5_MINUTES_NAME
    "3a8d4421-096e-4a1b-853a-c12886a51d1f", // UI_GAMECHANGERS_GLOBAL_HIDE_DEAD_BODY_WITHIN_90_SECONDS_NAME
    "1f1f3c9e-1490-4fcc-aee6-5fde7c6c48ca", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_RECORDINGS_PRIMARY_NAME
    "fd37b209-4e11-461e-a11f-394c92fbbe80", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_BODIES_FOUND_PRIMARY_NAME
    "3fea3aea-0233-46bb-8bc1-08757a2f6a74", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_HEADSHOTS_ONLY_PRIMARY_NAME
    "25760ea6-958b-4aab-97d4-b539c5b025c8", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_MISSED_SHOTS_PRIMARY_NAME
    "5fef7df0-94ef-47ef-b91e-d67578f81d76", // UI_GAMECHANGERS_GLOBAL_ONE_DISGUISE_CHANGE_NAME
    "95b8fdcf-9879-4e16-978f-c220ee6adac1", // UI_GAMECHANGERS_GLOBAL_ONE_PACIFICATION_NAME
    "5b368c64-ed49-4907-9075-d4a31953374a", // UI_GAMECHANGERS_GLOBAL_CAMERA_MISSION_COUNTDOWN_NAME
    "ca9604ab-c712-45db-b1b4-e04ac60d2465", // UI_GAMECHANGERS_GLOBAL_KILL_STREAK_60_SECS_OBJ
    "fdc7a60b-aa7f-4628-bd03-00c93393967f", // UI_GAMECHANGERS_GLOBAL_NO_CIVILIAN_CASUALTIES_NAME
    "f123cf4d-25c9-4eab-ad29-1b7d5294c74f", // UI_GAMECHANGERS_GLOBAL_DO_NOT_KILL_WITH_BULLETS_NAME
    "351ce43a-9f8f-4645-8e3a-4adf2ff08fc7", // UI_GAMECHANGERS_GLOBAL_COMPLETE_MISSION_WITHIN_3_MINUTES_NAME
    "bcda9aea-dcef-458c-b9b5-7471c3f8d0c1", // UI_GAMECHANGERS_GLOBAL_KILL_STREAK_60_SECS_OBJ
    "ce154566-a4ba-43c5-be4e-79240ce0f3f9", // UI_GAMECHANGERS_GLOBAL_CONTRACTCONDITION_NO_PACIFICATIONS_PRIMARY_NAME
    "296d76fc-682b-48a3-b336-8af37c1eaee3", // UI_GAMECHANGERS_GLOBAL_TARGET_KILLS_ONLY_NAME
    "f8feee12-0353-44ef-8b80-dfe0a0e11061", // UI_GAMECHANGERS_GLOBAL_NO_BODIES_FOUND_NAME
    "d2fb89c1-03a4-4c64-ab7f-5b39967708d2", // UI_GAMECHANGERS_GLOBAL_DO_NOT_GET_SPOTTED_NAME
    "ccb70076-6a89-4059-a894-fc300839a230", // UI_GAMECHANGERS_GLOBAL_DELETE_EVIDENCE_NAME
    "e06e5d9c-36ac-4ba4-a97b-d439c900d81b", // UI_GAMECHANGERS_GLOBAL_FROM_COMBAT_STATE_TO_CLEAR_NAME
    "0f74b76f-c887-4dcc-99ef-e93ea208cf08", // UI_GAMECHANGERS_GLOBAL_KILL_STREAK_60_SECS_OBJ
    "054a5ac6-59e1-42ed-885a-30c65f446e72", // UI_GAMECHANGERS_GLOBAL_SUIT_ONLY_NAME
    "cfaaac79-432f-4159-83c6-03128b4770d0"  // UI_GAMECHANGERS_GLOBAL_NO_CIVILIAN_CASUALTIES_NAME
];

// Function to generate a random integer within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to get random game changers based on the contract index
function getRandomGameChangers(contractIndex) {
    const numGameChangers = contractIndex + 1; // Incrementing the number of game changers for each contract
    const selectedGameChangers = [];
    for (let i = 0; i < numGameChangers; i++) {
        const randomIndex = getRandomInt(0, possibleGameChangers.length - 1);
        selectedGameChangers.push(possibleGameChangers[randomIndex]);
    }
    return selectedGameChangers;
}

function getRandomTargetId() {
    // Array of possible RepositoryIds for the first objective entry
    const possibleTargets =[
        "a8b161ef-276d-4744-826f-347d5df89b24",
        "3d25ee6c-61fa-4ba5-8f19-fedd905fd8fb",
        "8c168ba3-f29b-48b9-b607-dfd88db5651e",
        "01773a02-28e0-45d5-b50b-942120f7d3ae",
        "23d044d5-b33c-4e19-bf2b-29d07401f337",
        "2024d46c-0a52-4094-be84-5e62e10c46c3",
        "73e4699d-32e0-4764-9a2a-8eb31336e71f",
        "a021cdb5-96c9-4775-a4cb-9116169ef9cb",
        "367dde2a-2c3c-4466-becb-b0bfc2abdfb7",
        "3845f48e-20f4-407f-8550-30a5ff32f6e5",
        "b32b4190-ef17-471c-ad8b-65d03f94e221",
        "9a8f69a1-e8ea-439e-be38-7384233db669",
        "22eca6ba-5392-4fdc-b941-d00ca02e4fce",
        "a0d9369f-a0d4-4853-8742-c425e41a66a0",
        "a2de016f-44ae-4758-94e9-d2d0c0e97be1",
        "271755c3-3278-4fde-9cdd-6a8a28bfc079",
        "cbd10956-7c7c-4309-8637-3d4852d0a9cf",
        "05fa1c73-1f74-4620-8d85-b0aab8455c30",
        "5f6b56d0-20e0-48b6-a1c1-d27717266073",
        "ab981df4-efd9-4939-8895-7e7952b3aebb",
        "623e57ae-a8d1-45d3-b3de-956afed62113",
        "5b76fedc-2e78-4ca9-afd7-668e1c27cfd0",
        "3a16632f-59ef-48e0-86fa-e92ec0835c78",
        "0a854b70-49cd-4ad7-91af-f32bdd95f83d",
        "b363911a-0085-465e-9b16-aebbf11c2e5f",
        "73de0748-7563-462e-ac5f-6505611799f3",
        "d3ca1238-2a8b-4862-bff0-106cf11870f2",
        "5a2dc322-003f-4229-b434-783e888c1c54",
        "dbeb50b5-b08e-4af0-be0c-10bc34055d0d",
        "4b4ec8c3-3af3-4d64-92fe-0a746899251b",
        "52dd051b-5bff-434a-a661-b0cfbea3fcaf",
        "3437be7a-d97f-43cb-bc36-38e9598ee2cb",
        "89f4bdd0-8428-4acc-ac6b-0a3e4103dc85",
        "e4d51194-618a-4836-a73b-de54481eae8c",
        "65b2c378-c1e7-4630-8826-7e3fadf2c023",
        "1003bc25-c862-4916-9d33-4283e560a54f",
        "ee0d100c-fca4-4e13-8306-2b86b7f4e81f",
        "5c9a59eb-7dc4-4785-983f-7e411a755bab",
        "f7e92f5b-02a7-4010-bb46-25d0a751b691",
        "8f2aae24-9900-412f-a0c7-80a21503067d",
        "787738e2-1877-43c4-8768-f4e4e5547c9b",
        "790c0046-d76b-4a34-b329-a62d86146065",
        "060484ff-e6d6-4d6a-a103-6af06b3ce045",
        "aa9a8690-d572-4223-8a39-5cff56347d6d",
        "364264e9-87c6-4d62-aa77-4fba9baf8d45",
        "81c949ff-c1d0-4c84-97ab-e1658d4da2b0",
        "1afae070-bcd2-438f-87b8-629aa46c5ffe",
        "d3959196-6be0-43ea-b6e7-aafa70822045",
        "89e0510c-5015-46db-af52-8e6a5cf569b4",
        "f5c5eafb-f998-4175-b131-13636cb11591",
        "e4ef62da-e28b-4567-a0cb-73f6ba9a12f2",
        "ea622707-f837-4fdf-9431-76c761c3998c",
        "587460b8-1d91-4158-8329-e421123ee48a",
        "ee1e5897-eba1-4b50-af0b-1ecc5b2b7d55",
        "d10fc7ce-2f5a-433e-8e9b-d2e6b27a180e",
        "17f9c5ba-6180-4e05-9922-7b6e32ac886a",
        "6c1866f5-9fc1-4c4f-954d-9a9b94282e70",
        "db57d083-aa6c-4b16-b2d4-32580e95d2b5",
        "dd1e144b-7d3e-4782-a3fe-3509ea6b240d",
        "e8509e7b-569f-4aad-9b32-b783602de4d3",
        "1c2af709-a524-4078-b1b0-d2157d5184e5",
        "3dcd9901-276a-4e75-a739-7aa1f5e5487a",
        "fc3dee19-c692-482d-90bc-b7900537927f",
        "3401bd42-acbf-4d95-aa28-4fb0a4dfbf1a",
        "7f82134e-cb65-46eb-bd45-fd7954300108",
        "50018fc8-ede3-49d3-ad0a-9fb8e5aa034f",
        "afd86181-f647-424f-8a1c-18164e562cc0",
        "fd70484c-b79a-4601-9481-49accef03cf6",
        "be49f7b2-2acc-41aa-9292-52221ca3dc4e",
        "390807a3-7f83-4bf9-a454-7e55e0559090",
        "b0ce8df3-72d9-4008-b376-c1e08e29af20",
        "6a81e622-4b59-4a60-996e-84ab401d193e",
        "18b64f95-f633-417f-a020-a75f5cd634e5",
        "619d619c-4c3c-49d1-815d-ea9ae4ba4824",
        "cd46af3d-e2a5-479b-a471-d0205b7679f7",
        "307fd2a9-7db2-4908-8654-2648e41186c1",
        "08492373-df79-4a9b-9a5f-5e14f18ebf87",
        "95899fb2-a6fc-46c1-b5f8-776e5b0ee47f",
        "bb57d8c5-612c-4ead-9bc4-024e2995641e",
        "af589e83-295e-48f0-92a2-0065ff201f07",
        "26e09916-460d-47b7-ad88-952973e8adaa",
        "487dfc9e-20e1-4d6f-bfd0-0feda771f561",
        "d73b1f2b-27cb-4fde-8f5b-b0dea100e18d",
    ];

    // Randomly select one RepositoryId from the possible targets
    return possibleTargets[getRandomInt(0, possibleTargets.length - 1)];
}

// Randomize objectives and include extra game changers for each contract
contracts.forEach((contract, index) => {
    contract.Data.Objectives.forEach((objective) => {
        objective.SuccessEvent.EventValues.RepositoryId = getRandomTargetId();
    });
    // Include extra game changers
    contract.Data.GameChangers = getRandomGameChangers(index);
});

module.exports = function EscPlugin(controller) {
    // Add contracts
    contracts.forEach((contract) => {
        controller.addMission(contract);
        log(LogLevel.INFO, `[Contract] Title: ${contract.Metadata.Title}, Description: ${contract.Metadata.Description}`);
        log(LogLevel.INFO, `[Contract] Game Changers: ${contract.Data.GameChangers}`);
    });

    // Add escalations
    escalations.forEach((groupContract) => {
        controller.addEscalation(groupContract)
        controller.missionsInLocations.escalations[groupContract.Metadata.Location].push(groupContract.Metadata.Id)
    })

    log(LogLevel.INFO, "[The Gauntlet] Test V0.1'.");
};
