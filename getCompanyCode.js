/*
 * 自動採番のサンプルプログラム
 * Copyright (c) 2022 toryou
 *
 * Licensed under the MIT License
 * https://127.0.0.1:5500/fuji/getCompanyCode.js
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

    if (isNaN(record.会社コード.value)) {
      record.会社コード.error = '会社コードが1001から1999までの数値を入力してください。';
    } else if (record.会社コード.value <= 1000 || record.会社コード.value > 1999) {
      record.会社コード.error = '会社コードが1001から1999までの数値を入力してください。';
    }

    return event;
  });
})();