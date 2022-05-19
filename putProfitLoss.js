/*
 * 自動採番のサンプルプログラム
 * Copyright (c) 2022 toryou
 *
 * Licensed under the MIT License
 * https://127.0.0.1:5500/fuji/putProfitLoss.js
 */

(function() {

  'use strict';

  // レコード追加、編集画面の表示前処理
  var eventsShow = ['app.record.create.submit', 'app.record.edit.submit', 'app.record.index.edit.submit'];

  // レコード追加画面の保存前処理
  kintone.events.on(eventsShow, function(event) {

    var record = event.record;

    //フォーマットチェック
    if ( record.現場名.value == null) {
      record.現場名.error = '現場名が必ず選択してください。';
      return event;
    }

    if (isNaN(record.工事枝番番号.value)) {
      record.工事枝番番号.error = '工事枝番番号が1から99までの半角数値を入力してください。';
      return event;
    }
    
    if (record.工事枝番番号.value < 1 || record.工事枝番番号.value > 99) {
      record.工事枝番番号.error = '工事枝番番号が1から99までの半角数値を入力してください';
      return event;
    }

    //工事枝番番号は桁の場合、前に0を埋める
    record.工事枝番番号.value = record.工事枝番番号.value.toString().padStart(2, '0')

    //存在チェック
    const body = {
      'app': kintone.app.getId(),
      'query': '工事番号 = ' + record.工事番号.value + ' and 工事枝番番号 = ' + record.工事枝番番号.value ,
      'totalCount':'true'
    };
    
    //kintone.apiは非同期api、promiseの書き方が必要
    return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body).then(
      function(resp) {
        console.log(resp.totalCount);
        if ( resp.totalCount > 0) {
          record.工事枝番番号.error = '工事枝番番号は既に存在する';
        }
        return event;
      }
    )
  });
})();