// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
  name: "swift",
  dependencies: [
    // My dependencies
    .package(url: "https://github.com/apple/swift-format.git", branch: ("release/5.8"))
  ],
  targets: [
    .executableTarget(name: "MexicanWave"),
    .testTarget(
      name: "MexicanWaveTests",
      dependencies: ["MexicanWave"]
    ),

    .executableTarget(name: "ValidBraces"),
    .testTarget(
      name: "ValidBracesTests",
      dependencies: ["ValidBraces"]
    ),

    .executableTarget(name: "StreetFighterCharacterSelection"),
    .testTarget(
      name: "StreetFighterCharacterSelectionTests",
      dependencies: ["StreetFighterCharacterSelection"]
    ),

    .executableTarget(name: "AreTheyTheSame"),
    .testTarget(
      name: "AreTheyTheSameTests",
      dependencies: ["AreTheyTheSame"]
    ),
  ]
)
