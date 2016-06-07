(function($){
  $.fn.formstep = function(){

    var $form = this;

    // 現在表示されているfieldsetのインデックスを用意します。
    $form.formstepCurrent = 0;

    // 先頭以外のfieldsetを非表示にします。
    $form.find('fieldset:not(:first-child)').hide();

    // ハンドラを生成します。
    var $handler = $form.formstep = $();

    /**
     * jump()は、fieldsetを切り替えるメソッドです。
     * @param to 切り替え先インデックスを設定します。
     * @return 切り替えが成功するとtrueを返します。
     */
    $handler.jump = function(to){
      to = to || 0;
      var from = $form.formstepCurrent;
      if(to.match) to = !!to.match(/^[+-]/) ? eval(from+to) : parseInt(to);
      var abort = function(){ abort=null };
      $form.trigger('change', [from, to, abort]);
      $form.trigger('change:from('+from+')', [from, to, abort]);
      $form.trigger('change:to('+to+')', [from, to, abort]);
      if(!abort) return false;
      $form.find('fieldset').hide().eq(to).show();
      $form.trigger('changed', [from, to, abort]);
      $form.trigger('changed:from('+from+')', [from, to, abort]);
      $form.trigger('changed:to('+to+')', [from, to, abort]);
      $form.formstepCurrent = to;
      return true;
    };

    /**
     * next()は、次のfieldsetに切り替えるメソッドです。
     * @return 切り替えが成功するとtrueを返します。
     */
    $handler.next = function(){ return $handler.jump('+1'); };

    /**
     * next()は、次のfieldsetに切り替えるメソッドです。
     * @return 切り替えが成功するとtrueを返します。
     */
    $handler.prev = function(){ return $handler.jump('-1'); };

    /**
     * reset()は、先頭のfieldsetに切り替えるメソッドです。
     * @return 切り替えが成功するとtrueを返します。
     */
    $handler.prev = function(){ return $handler.jump(0); };

    return $form;
  }
})(jQuery);
