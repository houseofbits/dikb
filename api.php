<?php

include("admin/dikb_sql.php");

include("../config.php");

$db = new DIKB_SQL($conf['sql_host'], $conf['sql_user'], $conf['sql_password'], $conf['sql_db']);

$data = [
    'frontPageArticles' => $db->GetFrontPageArticles(),
    'portfolioOverview' => $db->GetPortfolioArticles(),
    'fullCategories' => $db->GetFullCategories(),
    'sliderImages' => $db->GetSliderData(),
];

echo json_encode($data);




