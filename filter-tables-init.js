jQuery(document).ready(function($) {
        $('table.wp-list-table').filterTable({
             inputSelector: '.search-box input[type=search][name=s]',
			 autofocus: true,
			 quickListTag: 'li',
			 hideTFootOnFilter: true
        });
});
