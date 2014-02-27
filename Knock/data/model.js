var socket = io.connect();
socket.on('connection', function() {
	console.log('connected');
});


function Pseudo_Set() {
	if ($("#pseudoInput").val() != "")
	{
		socket.emit('Pseudo_Set', $("#pseudoInput").val());
		$('#chatControls').show();
		$('#pseudoInput').hide();
		$('#pseudoSet').hide();
	}
}


function Message_New(msg, pseudo) {
	$("#chatEntries").append('<div class="message"><p>' + pseudo + ' said : ' + msg + '</p></div>');
}


function Message_Sent() {
	if ($('#messageInput').val() != "") 
	{
		socket.emit('message', $('#messageInput').val());
		Message_New($('#messageInput').val(), "Me", new Date().toISOString(), true);
		$('#messageInput').val('');
	}
}





socket.on('message', function(data) {
	Message_New(data['message'], data['pseudo']);
});


$(function() {
	$("#chatControls").hide();
	$("#pseudoSet").click(function() {Pseudo_Set()});
	$("#submit").click(function() {Message_Sent();});
});