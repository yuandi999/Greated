var rootpath = "localhost:8000/";
var sum=0;
let total=0;
let allPage=0;
let nowPage=1;
// $('.table-sort').dataTable({
// 	"aaSorting": [[ 1, "desc" ]],//默认第几个排序
// 	"bStateSave": true,//状态保存
// 	"aoColumnDefs": [
// 		//{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
// 		{"orderable":false,"aTargets":[0,8]}// 不参与排序的列
// 	]
// });

//用户名cookie
let storage=window.localStorage;
var Luname = storage.getItem('Luname');
var content='';
// console.log(Luname);
$("#guanli").html(Luname)

$("#out").click(function(){
	localStorage.removeItem('Luname')
	$("#guanli").html("超级管理员")
})

function all(){
	if(Luname==undefined){
	return alert("请先登录")
}
/*排序*/
let style=1;
$("#desc").click(function(){
	style=1;
	row(nowPage,content,style)
})
$("#dis").click(function(){
	style=-1;
	row(nowPage,content,style)
})
/*
regex:content
*/
//模糊查询

$("#ZXseach").click(function(){
	content = $("#ZXname").val();
	row(nowPage,content,style)
})
/*资讯-渲染*/

var rootpath='http://localhost:8000';
//限制数量
var yu=5;
function gradeChange(){
	var objS = document.getElementById("yu");
	yu = objS.options[objS.selectedIndex].text;
	console.log(yu);
	row(nowPage,content,style)
}
//数据渲染


function goPage(type){
  var targetPage=1;
  switch (type){
  	  case 'prev':
  	   targetPage=nowPage>1?nowPage-1:1

  	  break;
  	  case 'next':
  	  targetPage=nowPage<allPage?nowPage+1:allPage
  	
  	  break;
  	  case 'first':
  	  targetPage=1

  	  break;
  	  case 'last':
  	  targetPage=allPage
  	  break;
  }
  
  nowPage=targetPage
  row(targetPage,content,style);
}
row(nowPage,content,style)
$("#spa1").on("click","span",function(){
	// $(this).siblings().removeClass("sss");
	var page=$(this).text();
	row(page,content,style);
	
})
function row(targetPage,content,style){
	$.ajax({
		url:"admin/getData",
		data:{yu,targetPage,content,style},
		type:"GET",
		success:function(arr){
			var html=``;
			var html2=``;
			// console.log(typeof(arr),arr.data2);
			var data=arr.data2;
			for(var i=0; i<data.length; i++){
				html+=`<tr class="text-c">
							<td class="del"><input type="checkbox" value="" name="" in="${data[i]._id}"></td>
							<td>${data[i].title}</td>
							<td class="text-l"><s style="cursor:pointer" class="text-primary" >${data[i].main}</s></td>
							<td>${data[i].style}</td>
							<td>H-ui</td>
							<td>${data[i].data}</td>
							<td><img src="../${data[i].img}" style="width: 50px;height: 50px"></td>
							<td class="td-status"><span class="label label-success radius">草稿</span></td>
							<td class="f-14 td-manage">
								<a style="text-decoration:none" class="ml-5" onClick="article_edit('/article-edit.html','${data[i]._id}')" title="编辑"><i class="Hui-iconfont">&#xe6df;</i></a>
								<a style="text-decoration:none" class="ml-5" onClick="article_del(this,'${data[i]._id}')" href="javascript:;" title="删除"><i class="Hui-iconfont">&#xe6e2;</i></a></td>
						</tr>`;
			}
			$("#body").html(html);
			sum=arr.sum;
			html2=`${sum}`;
			$("#num").html(html2);
			//分页数  yu=5
			allPage = Math.ceil(sum/yu)*1;
			var html3=``;
			for(var j=1; j<=allPage; j++){
				html3+=`<span>${j}</span>`
			}
			$("#spa1").html(html3);
			for(var s=0; s<allPage; s++){
				if($("#spa1 span").eq(s).html()==targetPage){
					$("#spa1 span").eq(s).addClass("ss")
				}
			}
		}
	})
}

/*模糊查询*/

/*资讯-添加*/
function article_add(url,id){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*资讯-编辑*/
function article_edit(url,id){
	console.log(id);
	let storage=window.localStorage;
	var ids = storage.setItem('ids',id)
	location.href=rootpath+url;
	
}
/*资讯-删除*/
function article_del(obj,id){
	console.log(id);
	layer.confirm('确认要删除吗？',function(index){
		$.ajax({
			type: 'POST',
			data:{id},
			url: rootpath+'/admin/delData',
			// dataType: 'json',
			success: function(data){
				console.log(data);
				$(obj).parents("tr").remove();
				layer.msg('已删除!',{icon:1,time:1000});
			}
		});
	});
}

/*资讯-审核*/
function article_shenhe(obj,id){
	layer.confirm('审核文章？', {
		btn: ['通过','不通过','取消'], 
		shade: false,
		closeBtn: 0
	},
	function(){
		$(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_start(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
		$(obj).remove();
		layer.msg('已发布', {icon:6,time:1000});
	},
	function(){
		$(obj).parents("tr").find(".td-manage").prepend('<a class="c-primary" onClick="article_shenqing(this,id)" href="javascript:;" title="申请上线">申请上线</a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-danger radius">未通过</span>');
		$(obj).remove();
    	layer.msg('未通过', {icon:5,time:1000});
	});	
}
/*资讯-下架*/
function article_stop(obj,id){
	layer.confirm('确认要下架吗？',function(index){
		$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="article_start(this,id)" href="javascript:;" title="发布"><i class="Hui-iconfont">&#xe603;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已下架</span>');
		$(obj).remove();
		layer.msg('已下架!',{icon: 5,time:1000});
	});
}

/*资讯-发布*/
function article_start(obj,id){
	layer.confirm('确认要发布吗？',function(index){
		$(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" onClick="article_stop(this,id)" href="javascript:;" title="下架"><i class="Hui-iconfont">&#xe6de;</i></a>');
		$(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已发布</span>');
		$(obj).remove();
		layer.msg('已发布!',{icon: 6,time:1000});
	});
}
/*资讯-申请上线*/
function article_shenqing(obj,id){
	$(obj).parents("tr").find(".td-status").html('<span class="label label-default radius">待审核</span>');
	$(obj).parents("tr").find(".td-manage").html("");
	layer.msg('已提交申请，耐心等待审核!', {icon: 1,time:2000});
}
/*批量删除*/

function checked(){
	var arr=[];
	//设置一个空数组，等会被选中的就把下标存起来
	var le=$('.del input').size();
	for(var i=0;i<le;i++){
		if($('.del input').eq(i).prop('checked')){
			// console.log($('.del input').eq(i).attr("in"));
			arr.push($('.del input').eq(i).attr("in"));
		}
	}
	// console.log(arr);
	return arr;
}
function datadel(){
	var arr=checked();//被选中的行
	console.log(arr);
	var res=confirm('您确定要删除多行吗？');
	if(res){
		//删除arr下标对应的行
		$.ajax({
			type: 'POST',
			data:{arr},
			url:rootpath+'/admin/delMore',
			dataType: 'json',
			success: function(data){
				location.reload();
				layer.msg('已删除!',{icon:1,time:1000});
			}
		});
	}
}
}
all()