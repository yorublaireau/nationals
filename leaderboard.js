// window.data.init			  = data___init;
// window.data.save			 = data___save;
// window.data.get_list		 = data___get_list;
// window.data.get_everything = data___get_everything;

(function () {

	data.init('nationals_test_tom');
	create_data();
	get_data('winner');
	
	populate_category();
	populate_leaderboard();
	
	function create_data(){
		
	    var students = [
	       {name : 'Simon Lemoine',university_name : 'de Montfort university',category_name : 'High Fantasy'},
	       {name : 'Preacher K',university_name : 'Leicester Uni',category_name : 'High Fantasy'},
	       {name : 'Katie North',university_name : 'VAGUE',category_name : 'High Fantasy'},
	       {name : 'Ben Glover',university_name : 'Leicester Uni',category_name : 'Sci Fi'},
	       {name : 'Tom Lee',university_name : 'VAGUE',category_name : 'Sci Fi'},
	       {name : 'Jack Cortese',university_name : 'De Montfort University',category_name : 'Sci Fi'}
	   ];
	   var unis = [{name : 'De Montfort University'},{name : 'Leicester Uni'},{name : 'VAGUE'}];
	   var categories = [{name : 'High Fantasy'},{name : 'Sci Fi'}];

	   var winners = [
	       {category_fk:1, first_student_fk : 2, second_student_fk : 1, third_student_fk : 3},
	       {category_fk:2, first_student_fk : 5, second_student_fk : 6, third_student_fk : 4}
	   ];

	   data.save('university', unis);
	   data.save('category', categories);
	   data.save('student', students);
	   data.save('winner', winners);
	}
	
	function populate_category() {
		var competitor, i, number_names = ['first', 'second', 'third'];
		
		var list = data.get_list('winner');
		
		var category_name = data.get_entry('category', list[0].category_fk).name;
		
		var competitors = [];
		for (i = 0; i < 3; i++) {
			competitor = new Competitor();
			competitor.id = list[0][number_names[i]+"_student_fk"];
			competitor.find_and_set_name_and_team();
			competitors.push(competitor);
			
		}
		
		console.log(competitors);
		
		var category_table_body = document.querySelector('#category-table tbody');
		var output_str = '';
		for (i = 0; i < 3; i++) {
			competitor = competitors[i];
			output_str += '<tr><td>' + competitor.name + '</td><td>' + competitor.team_name + '</td></tr>';
		}
		
		category_table_body.innerHTML = output_str;
	}
	
	function populate_leaderboard() {
		var list = data.get_list('university');
		
		console.log(list)
	}
	
	function get_data(type){
		
		var list = data.get_list(type);
		
		console.log(JSON.stringify(list, null, 2));
		
		console.log(data.get_entry('student', list[0].first_student_fk));
		
	}
	
	
})();
