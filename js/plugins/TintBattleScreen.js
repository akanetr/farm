//=============================================================================
// TintBattleScreen.js
// ----------------------------------------------------------------------------
// <利用規約>
//  利用はRPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
//  商用、非商用、ゲームの内容を問わず利用可能です。
//  ゲームへの利用の際、報告や出典元の記載等は必須ではありません。
//  二次配布や転載は禁止します。
//  ソースコードURL、ダウンロードURLへの直接リンクも禁止します。
//  不具合対応以外のサポートやリクエストは受け付けておりません。
//  スクリプト利用により生じたいかなる問題においても、一切責任を負いかねます。
//  不具合報告は https://twitter.com/koma_neko まで。
// ----------------------------------------------------------------------------
//  Ver1.00  2016/02/27  初版
//=============================================================================

/*:
 * @plugindesc バトルシーンの色調を設定します。
 * @author こま
 *
 * @param DEFAULT TONE
 * @desc デフォルトの色調（赤・緑・青・グレー）を設定してください。
 * @default 0 0 0 0
 *
 * @help
 * パラメータ：
 *   DEFAULT TONE
 *   : バトルシーンの色調を設定します。色調の赤、緑、青、グレーの値を半角スペース
 *   : で区切って指定してください。設定値の詳細については、イベントコマンド「画面
 *   : の色調変更」を参考にしてください。本設定は、後述のプラグインコマンドにてゲ
 *   : ーム内で変更できます。
 *
 * プラグインコマンド：
 *   TBS_BattleTone <red> <green> <blue> <gray>
 *   : バトルシーンの色調を設定します。
 *   : 使用例 : TBS_BattleTone -68 -68 0 68
 *   :          > バトルシーンの色調が、夜のようになります。設定値の詳細については
 *   :          > イベントコマンド「画面の色調変更」を参考にしてください。
 */

(function(){
    var pluginName = 'TintBattleScreen';
    
    var params = PluginManager.parameters(pluginName);
    var defaultTone = params['DEFAULT TONE'].split(' ').map(function(value){ return +value; });

    // Object Property for Plugin
    function pprop(obj) {
        return (obj[pluginName] = obj[pluginName] || {});
    }
    
    //=========================================================================
    // Screen_Battle
    //=========================================================================
    var _alias_Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _alias_Scene_Battle_start.call(this);
        if (!pprop($gameScreen).battleTone) {
            pprop($gameScreen).battleTone = [0,1,2,3].map(function(value){ return defaultTone[value] || 0; })
        }
        pprop($gameScreen).mapTone = $gameScreen._tone;
        $gameScreen._tone = pprop($gameScreen).battleTone;
    };

    var _alias_Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _alias_Scene_Battle_terminate.call(this);
        $gameScreen._tone = pprop($gameScreen).mapTone;
    };

    //=========================================================================
    // Game_Interpreter
    //=========================================================================
    var _alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _alias_Game_Interpreter_pluginCommand.call (this, command, args);
        switch (command.toUpperCase()) {
        case 'TBS_BATTLETONE':
            pprop($gameScreen).battleTone = [0,1,2,3].map(function(value){ return +args[value] || 0 });
            break;
        }
    }
}());
