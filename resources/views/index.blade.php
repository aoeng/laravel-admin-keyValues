<div class="{{$viewClass['form-group']}}">

    <label for="{{$id}}" class="{{$viewClass['label']}} control-label">{{$label}}</label>

    <div class="{{$viewClass['field']}}">

        <div class="kv_warp kv_{{$class}}">
            <input type="hidden" class="Js_kv_input" name="{{$name}}" value="{{old($column, json_encode($value))}}">

            <div class="kv_attr_key_val">
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width: 100px">Key</th>
                            <th>Value</th>
                            <th style="width: 100px"></th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <span class="btn btn-success Js_add_attr_name">添加</span>
            </div>
        </div>

    </div>
</div>
