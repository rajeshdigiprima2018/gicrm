	<?php
		function active($currect_page){
		  $url =  basename($_SERVER['REQUEST_URI'], '?' . $_SERVER['QUERY_STRING']);
		  if($currect_page == $url){
		      echo 'link-active'; 
		  } 
		}
	?>
	<div class="container">
		<nav class="navbar navbar-custom" role="navigation">
		  <div class="container">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="index.php">GICRM </a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav">
		        <li class="<?php active('index.php');?>"><a class="navbar-brand <?php active('index.php');?>" href="index.php">MID STREAM <span class="sr-only">(current)</span></a></li>
		        <li class="<?php active('storagetank.php');?>"><a class="navbar-brand <?php active('storagetank.php');?>" href="storagetank.php">STORAGE TANK</a></li>
		        <li class="<?php active('water.php');?>"><a class="navbar-brand <?php active('water.php');?>" href="water.php">WATER TANK</a></li>
		     	<li class="<?php active('pondlevel.php');?>"><a class="navbar-brand <?php active('pondlevel.php');?>" href="pondlevel.php">POND LAVEL</a></li>	
		      </ul>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>
	</div>
