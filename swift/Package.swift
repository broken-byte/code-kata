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
    // Targets are the basic building blocks of a package, defining a module or a test suite.
    // Targets can depend on other targets in this package and products from dependencies.
    .executableTarget(
      name: "MexicanWave"),
    .testTarget(
      name: "MexicanWaveTests",
      dependencies: ["MexicanWave"]),
  ]
)