#jquery-check

jquery-check was designed to make implementation as easy as possible. Before implementing, make sure you meet the minimum requirements.

![image][]
 [image]: https://github.com/amazingSurge/jquery-check/blob/master/demo/img/style1.JPG

### Requirements
- 	jQuery 1.4.x or greater

### Implementation

For the most basic implementation, follow the steps below:

1.	Download the [jquery-check](https://raw.github.com/amazingSurge/jquery-check) Package

2.	Unzip the package and upload the following files into a folder on your website:  

		- 	jquery.check.js
		- 	check.css 

3.	On the page you are implementing Paginator on, add a reference to the jQuery library.

		<script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>

4.	Below the reference to jQuery, add a reference to the Paginator script.

		<script type="text/javascript" src="/jquery.check.js"></script>

5.	On the page, add a input (or any other element with an class works).

		<ul>
            <li>
                <input class="radio" type="radio" name="radiobox" id="male-1" value="male" />
                <label for="male-1" >Male</label>
            </li>
             <li>
                <input class="radio" type="radio" name="radiobox" id="male-2" value="female" />
                <label for="male-2" >Female</label>
            </li>
            <li>
                <input class="radio" type="radio" name="radiobox" id="male-3" value="male" disabled="disabled" />
                <label for="male-3" >checked disable</label>
            </li>
            <li>
                <input class="radio" type="radio" name="radiobox" id="male-4" value="male" disabled="disabled" />
                <label for="male-4" >checked disable</label>
            </li>
        </ul>

6.	Initialize Paginator on the file input. the first argument is the total pages get from your server , the second is options. 
		
		$(document).ready(function() {
		    $(".radio").check();                         
		});

7.	Add a link to the Paginator stylesheets in the head of the document.

		<link rel="stylesheet" type="text/css" href="check.css" />

8.	The final page should look like the following:

		<!DOCTYPE html>
		<html>
			<head>
			    <title>My Uploadify Implementation</title>
			    <link rel="stylesheet" type="text/css" href="check.css">
			    <script type="text/javascript" src="http://code.jquery.com/jquery-1.7.2.min.js"></script>
			    <script type="text/javascript" src="jquery.check.js"></script>
			    <script type="text/javascript">
			    $(document).ready(function() {
				    $(".radio").check();                         
				});
			    </script>
			</head>
			<body>
				<ul>
		            <li>
		                <input class="radio" type="radio" name="radiobox" id="male-1" value="male" />
		                <label for="male-1" >Male</label>
		            </li>
		             <li>
		                <input class="radio" type="radio" name="radiobox" id="male-2" value="female" />
		                <label for="male-2" >Female</label>
		            </li>
		            <li>
		                <input class="radio" type="radio" name="radiobox" id="male-3" value="male" disabled="disabled" />
		                <label for="male-3" >checked disable</label>
		            </li>
		            <li>
		                <input class="radio" type="radio" name="radiobox" id="male-4" value="male" disabled="disabled" />
		                <label for="male-4" >checked disable</label>
		            </li>
		        </ul>
			</body>
		</html>


### Documentation
_(Coming soon)_

### License MIT
_(Coming soon)_

### Release History
_(Nothing yet)_
