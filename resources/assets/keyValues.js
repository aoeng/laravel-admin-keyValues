(function () {
    // 上传地址

    function keyValues(name) {
        this.name = name
        this.warp = $('.kv_' + name);
        let value = $(`input[name=${name}]`)[0].value
        this.attrs = value === "" ? {} : JSON.parse(value);
        this.init();
    }

    keyValues.prototype.init = function () {
        let _this = this;
        // 绑定属性值添加事件
        _this.warp.find('.kv_attr_key_val').on('click', '.Js_add_attr_val', function () {

            let html = '<div class="kv_attr_val_item">' +
                '<div class="kv_attr_val_input">' +
                '<input type="text" class="form-control">' +
                '</div>' +
                '<span class="btn btn-danger Js_remove_attr_val"><i class="glyphicon glyphicon-remove"></i></span>' +
                '</div>';
            $(this).before(html);
        });

        // 绑定属性值移除事件
        _this.warp.find('.kv_attr_key_val').on('click', '.Js_remove_attr_val', function () {
            $(this).parent('.kv_attr_val_item').remove();
            _this.getSkuAttr();
        });

        // 绑定添加属性名事件
        _this.warp.find('.Js_add_attr_name').click(function () {
            console.log(111)
            let html = '<tr>' +
                '<td><input type="text" class="form-control"></td>' +
                '<td>' +
                '<div class="kv_attr_val_warp">' +
                '<div class="kv_attr_val_item">' +
                '<div class="kv_attr_val_input">' +
                '<input type="text" class="form-control">' +
                '</div>' +
                '<span class="btn btn-danger Js_remove_attr_val"><i class="glyphicon glyphicon-remove"></i></span>' +
                '</div>' +
                '<div class="kv_attr_val_item Js_add_attr_val" style="padding-left:10px">' +
                '<span class="btn btn-success"><i class="glyphicon glyphicon-plus"></i></span>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<span class="btn btn-warning Js_remove_attr_name">移除</span>' +
                '</td>' +
                '</tr>';
            _this.warp.find('.kv_attr_key_val tbody').append(html)
        });

        // 绑定移除属性名事件
        _this.warp.find('.kv_attr_key_val').on('click', '.Js_remove_attr_name', function () {
            console.log('移除属性名');
            $(this).parents('tr').remove();
            _this.getSkuAttr()
        });

        _this.warp.find('.kv_attr_key_val tbody').on('change', 'input', _this.getSkuAttr.bind(_this));
        _this.initForm()
    };
    keyValues.prototype.initForm = function () {
        let _this = this;
        if (_this.attrs=== null) return false;
        let html = "";
        console.log(_this.attrs)
        $.each(_this.attrs, function (key, values) {
            html += '<tr>' +
                `<td><input type="text" value="${key}" class="form-control"></td>` +
                '<td>' +
                '<div class="kv_attr_val_warp">';
            $.each(values, function (n, value) {
                html += '<div class="kv_attr_val_item">' +
                    '<div class="kv_attr_val_input">' +
                    `<input type="text" class="form-control" value="${value}">` +
                    '</div>' +
                    '<span class="btn btn-danger Js_remove_attr_val"><i class="glyphicon glyphicon-remove"></i></span>' +
                    '</div>';
            })

            html += '<div class="kv_attr_val_item Js_add_attr_val" style="padding-left:10px">' +
                '<span class="btn btn-success"><i class="glyphicon glyphicon-plus"></i></span>' +
                '</div>' +
                '</div>' +
                '</td>' +
                '<td>' +
                '<span class="btn btn-warning Js_remove_attr_name">移除</span>' +
                '</td>' +
                '</tr>';
        });

        _this.warp.find('.kv_attr_key_val tbody').append(html)

    };

    // 获取SKU属性
    keyValues.prototype.getSkuAttr = function () {
        let attr = {}; // 所有属性
        let _this = this;
        let trs = _this.warp.find('.kv_attr_key_val tbody tr');
        trs.each(function () {
            let tr = $(this);
            let attr_name = tr.find('td:eq(0) input').val(); // 属性名
            let attr_val = []; // 属性值
            if (attr_name) {
                // 获取对应的属性值
                tr.find('td:eq(1) input').each(function () {
                    let ipt_val = $(this).val();
                    if (ipt_val) {
                        attr_val.push(ipt_val)
                    }
                });
            }
            if (attr_val.length) {
                attr[attr_name] = attr_val;
            }
        });

        if (JSON.stringify(_this.attrs) !== JSON.stringify(attr)) {
            _this.attrs = attr;
            $(`input[name=${_this.name}]`).val(JSON.stringify(_this.attrs))
            console.log(_this.attrs, _this.name)
        }
    };

    window.LaravelAdminKeyValues = keyValues;
})();
