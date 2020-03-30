(function(){
    'use strict';

    // フェードイン時間（フレーム数）
    var fadeDuration = 30;

    // フェード用Bitmap
    var fadeBitmap = null;

    //==============================================================================
    // Scene_Map
    //==============================================================================

    var _Scene_Map_startFadeIn = Scene_Map.prototype.startFadeIn;
    Scene_Map.prototype.startFadeIn = function(duration, white) {
        if (SceneManager.isPreviousScene(Scene_Battle) && fadeBitmap) {
            // フェード時間設定
            duration = fadeDuration;
            // フェードスプライトがすでに作られていたら削除
            if (this._fadeSprite) {
                this.removeChild(this._fadeSprite);
                this._fadeSprite = null;
            }
            // 元関数呼び出し
            _Scene_Battle_startFadeIn.call(this, duration, white);
            // フェードイン用の画像を、事前にキャプチャした画像に差し替え
            this.removeChild(this._fadeSprite);
            this._fadeSprite = new Sprite(fadeBitmap);
            this.addChild(this._fadeSprite);
            return;
        }
        if (!(this._fadeSprite instanceof ScreenSprite)) {
            this._fadeSprite = null;
        }
        _Scene_Map_startFadeIn.call(this, duration, white);
    };

    var _Scene_Map_startFadeOut = Scene_Map.prototype.startFadeOut;
    Scene_Map.prototype.startFadeOut = function(duration, white) {
        if (!(this._fadeSprite instanceof ScreenSprite)) {
            this._fadeSprite = null;
        }
        _Scene_Battle_startFadeOut.call(this, duration, white);
    };

    Scene_Map.prototype.startEncounterEffect = function() {
        // ウインドウ非表示
        this._windowLayer.visible = false;
        // マップクリック時の行き先エフェクトを消す
        $gameTemp.clearDestination();
        this._spriteset._destinationSprite.visible = false;
        // イベントを残した画面をキャプチャ
        fadeBitmap = Bitmap.snap(this);
        // イベント非表示
        this._spriteset.hideCharacters();
        // イベントを消した画面をキャプチャ
        SceneManager._backgroundBitmap = Bitmap.snap(this);
        // イベント非表示を解除
        this._spriteset._characterSprites.forEach(function(sprite) {
            if (!sprite.isTile()) {
                sprite.show();
            }
        });
        // ウインドウ非表示を解除
        this._windowLayer.visible = true;
    };

    //==============================================================================
    // Scene_Battle
    //==============================================================================

    var _Scene_Battle_startFadeIn = Scene_Battle.prototype.startFadeIn;
    Scene_Battle.prototype.startFadeIn = function(duration, white) {
        if (fadeBitmap) {
            // フェード時間設定
            duration = fadeDuration;
            // フェードスプライトがすでに作られていたら削除
            if (this._fadeSprite) {
                this.removeChild(this._fadeSprite);
                this._fadeSprite = null;
            }
            // 元関数呼び出し
            _Scene_Battle_startFadeIn.call(this, duration, white);
            // フェードイン用の画像を、事前にキャプチャした画像に差し替え
            this.removeChild(this._fadeSprite);
            this._fadeSprite = new Sprite(fadeBitmap);
            this.addChild(this._fadeSprite);
            return;
        }
        if (!(this._fadeSprite instanceof ScreenSprite)) {
            this._fadeSprite = null;
        }
        _Scene_Battle_startFadeIn.call(this, duration, white);
    };

    var _Scene_Battle_startFadeOut = Scene_Battle.prototype.startFadeOut;
    Scene_Battle.prototype.startFadeOut = function(duration, white) {
        this._fadeSprite = null;
        // 元関数呼び出し
        _Scene_Battle_startFadeOut.call(this, duration, white);
        // フェード無効化
        this._fadeDuration = 0;
        // ウインドウ非表示
        this._windowLayer.visible = false;
        // 画面をキャプチャ
        fadeBitmap = Bitmap.snap(this);
        // ウインドウ非表示を解除
//        this._windowLayer.visible = true;
    };
}());
