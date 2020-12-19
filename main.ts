radio.onReceivedNumberDeprecated(function (値) {
    if (値 <= 4) {
        相手ビーム = game.createSprite(値, 0)
        相手ビーム到達 = true
    } else if (値 == 10) {
        music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
        game.addScore(1)
    } else if (値 == 20) {
        music.startMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once)
        game.gameOver()
    }
})
input.onButtonPressed(Button.A, function () {
    プレイヤー.change(LedSpriteProperty.X, -1)
    if (ビーム発射 == false) {
        ビーム.set(LedSpriteProperty.X, プレイヤー.get(LedSpriteProperty.X))
    }
})
input.onButtonPressed(Button.AB, function () {
    ビーム発射 = true
})
input.onButtonPressed(Button.B, function () {
    プレイヤー.change(LedSpriteProperty.X, 1)
    if (ビーム発射 == false) {
        ビーム.set(LedSpriteProperty.X, プレイヤー.get(LedSpriteProperty.X))
    }
})
let 相手ビーム: game.LedSprite = null
let 相手ビーム到達 = false
let ビーム発射 = false
let ビーム: game.LedSprite = null
let プレイヤー: game.LedSprite = null
game.setScore(0)
radio.setGroup(1)
プレイヤー = game.createSprite(2, 4)
ビーム = game.createSprite(2, 4)
ビーム発射 = false
相手ビーム到達 = false
basic.forever(function () {
    if (ビーム発射 == true) {
        ビーム.change(LedSpriteProperty.Y, -1)
        basic.pause(100)
        if (ビーム.get(LedSpriteProperty.Y) == 0) {
            radio.sendNumber(ビーム.get(LedSpriteProperty.X))
            ビーム.set(LedSpriteProperty.X, プレイヤー.get(LedSpriteProperty.X))
            ビーム.set(LedSpriteProperty.Y, 4)
            ビーム発射 = false
        }
    }
})
basic.forever(function () {
    if (game.score() == 5) {
        プレイヤー.delete()
        ビーム.delete()
        radio.sendNumber(20)
        music.startMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Forever)
        while (true) {
            basic.showString("YOU WIN!")
        }
    } else if (相手ビーム到達 == true && 相手ビーム.isTouching(プレイヤー)) {
        radio.sendNumber(10)
        music.playTone(131, music.beat(BeatFraction.Half))
        相手ビーム到達 = false
        相手ビーム.delete()
    }
})
basic.forever(function () {
    if (相手ビーム到達 == true) {
        相手ビーム.change(LedSpriteProperty.Y, 1)
        basic.pause(100)
        if (相手ビーム.get(LedSpriteProperty.Y) == 4) {
            相手ビーム到達 = false
            相手ビーム.delete()
        }
    }
})
