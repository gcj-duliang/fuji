/*
 * 自動採番のサンプルプログラム
 * Copyright (c) 2022 toryou
 *
 * Licensed under the MIT License
 * https://127.0.0.1:5500/fuji/getScene.js
 */

(function() {

  'use strict';
  // レコード追加、編集画面の表示前処理
  var eventsShow = ['app.record.create.show', 'app.record.edit.show', 'app.record.index.edit.show'];
  kintone.events.on(eventsShow, function(event) {

    var elm_display = document.getElementsByClassName('input-constraints-cybozu');
    elm_display[0].innerText = "";

  });

  // レコード追加画面の保存前処理
  kintone.events.on('app.record.create.submit', function(event) {

    var record = event.record;

    if (isNaN(record.工事番号.value)) {
      record.工事番号.error = '工事番号が2001から2999までの半角数値を入力してください。';
    } else if (record.工事番号.value <= 2000 || record.工事番号.value > 2999) {
      record.工事番号.error = '工事番号が2001から2999までの半角数値を入力してください。';
    }

    return event;
  });
})();