/*
 * 担当者コードは手動で01～99まで入力する
 * 会社社コード＋担当者コードで存在チェックを実施する。存在するとエラーになる。
 * Copyright (c) 2022 toryou
 *
 * Licensed under the MIT License
 * https://127.0.0.1:5500/fuji/getCompanyUser.js
 */

(function() {

  'use strict';
    
  var flg_res;

  // レコード追加、編集画面の表示前処理
  var eventsShow = ['app.record.create.submit', 'app.record.edit.submit', 'app.record.index.edit.submit'];

  // レコード追加画面の保存前処理
  kintone.events.on(eventsShow, function(event) {

    var record = event.record;

    //フォーマットチェック
    if ( record.会社名.value == null) {
      record.会社名.error = '会社名が必ず選択してください。';
      return event;
    }

    if (isNaN(record.担当者コード.value)) {
      record.担当者コード.error = '担当者コードが1から99までの半角数値を入力してください。';
      return event;
    }
    
    if (record.担当者コード.value < 1 || record.担当者コード.value > 99) {
      record.担当者コード.error = '担当者コードが1から99までの半角数値を入力してください';
      return event;
    }

    //担当者コードは桁の場合、前に0を埋める
    record.担当者コード.value = record.担当者コード.value.toString().padStart(2, '0')

    //存在チェック
    const body = {
      'app': kintone.app.getId(),
      'query': '会社コード = ' + record.会社コード.value + ' and 担当者コード = ' + record.担当者コード.value ,
      'totalCount':'true'
    };
    
    //kintone.apiは非同期api、promiseの書き方が必要
    return kintone.api(kintone.api.url('/k/v1/records.json', true), 'GET', body).then(
      function(resp) {
        console.log(resp.totalCount);
        if ( resp.totalCount > 0) {
          record.担当者コード.error = '担当者コードは既に存在する';
        }
        return event;
      }
    )
  });
})();