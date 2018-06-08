//表单提交
$('#submit').click(function(){
	if($('#name').val() == ''){
		$('#warning').fadeIn();
		return;
	}
	
	$('#name').focus(function(){
		$('#success').hide();
		$('#defeat').hide();
		$('#warning').hide();
	})
	
	$.post('/submit',{
	'name':$('#name').val(),
	'words':$('#words').val()
	},function(result){
		if(result.result = 1){
			$('#success').fadeIn();
			var compiled = _.template($('#other-muban').html());
			var html = compiled({'name':$('#name').val(),'words':$('#words').val(),'time':new Date()}); //此id为假的id
			$(html).insertBefore($('.liuyanqu'));
			
			$('#name').val('');
			$('#words').val('');
			
		} else if(result.result = -1){
			$('#defeat').fadeIn();
			$('#name').val('');
			$('#words').val('');
		}
	})
})
			function getData(page){
				$.get('/get?page='+(page-1),function(result){    		
		    		var compiled = _.template($("#muban").html());
		    		for(var i=0;i<result.result.length;i++){
		    			var html = compiled({'name':result.result[i].name,'words':result.result[i].words,'time':result.result[i].time,'id':result.result[i]._id});
		    			$('.liuyanqu').append($(html));
		    		}
	    		})
			}
getData(1);
				
//局部刷新
$('.pagenumber').click(function(){
	var nowpage = $(this).attr('data-page');
	$('.liuyanqu').html('');
	getData(nowpage);
	
})


	
