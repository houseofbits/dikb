<?php

class DIKB_SQL extends mysqli {
    public function __construct($host, $user, $pass, $db) {
        parent::init();

        if (!parent::real_connect($host, $user, $pass, $db)) {
            die('Connect Error (' . mysqli_connect_errno() . ') '
                    . mysqli_connect_error());
        }
        if (!parent::set_charset("utf8")){
            die('set_charset failed');
        }		
    }

    function fetchAll($result){
        $data = [];
        if($result) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            $result->free();
        }
        return $data;
    }
	//////////////////////////////////////////////////////////////////////////////////
	//interface	
	
	public function GetSliderData(){
		if($result = $this->query("SELECT im.id imageID, c.title category, c.id catid, a.id articleid
			FROM images im
				LEFT JOIN articles a ON a.id = im.articleid
				LEFT JOIN category c ON c.id = a.category
			WHERE im.slider >0
				ORDER BY im.slider
				LIMIT 0 , 8;")){
				$array = array();		
				while($obj = $result->fetch_array(MYSQLI_ASSOC)){
					array_push($array, ['id'=>$obj['imageID'],
											'catID'=>$obj['catid'], 
											'category'=>$obj['category'], 
											'articleid'=>$obj['articleid']]);
				}
				$result->close();
				return $array;		
			}
		return 0;
	}
	//	
	public function GetRandomFrontPageArticle($not_in_id_array){
		//.")
		$notin='';
		if(is_array($not_in_id_array) && sizeof($not_in_id_array)>0){
		  $notin = '';  //'AND a.id NOT IN ('.implode(',', $not_in_id_array).')';
		}
		if($result = $this->query("
				SELECT 
					a.id id,
					c.id catID,
					a.title,
					c.title category,
					im.id imageID
				FROM articles a
					LEFT JOIN category c ON c.id = a.category
					LEFT JOIN images im ON im.articleid = a.id
				WHERE 
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id)>0 AND
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id AND images.first>0)>0 AND
					im.first>0".$notin."
				OR
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id)>0 AND
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id AND images.first>0)=0
					".$notin."	
				ORDER BY RAND()
				LIMIT 0,1;")){		
			$array = array();		
			while($obj = $result->fetch_array(MYSQLI_ASSOC)){
				array_push($array, array('id'=>$obj['id'], 
										'catID'=>$obj['catID'], 
										'title'=>$obj['title'], 
										'category'=>$obj['category'], 
										'imageID'=>$obj['imageID']));
			}
			$result->close();
			return $array;						
		}
		return 0;		
	}	
	
	public function GetFrontPageArticles(){

		if($result = $this->query("
				SELECT 
					a.id id,
					c.id catID,
					a.title,
					c.title category,
					a.message,
					im.id imageID
				FROM articles a
					LEFT JOIN category c ON c.id = a.category
					LEFT JOIN images im ON im.articleid = a.id
				WHERE 
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id)>0 AND
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id AND images.first>0)>0 AND
					im.first>0 
				OR
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id)>0 AND
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id AND images.first>0)=0	
				ORDER BY RAND()
				LIMIT 0,4;
				
				")){
			$articles = $this->fetchAll($result);//->fetch_all(MYSQLI_ASSOC);
            foreach ($articles as &$article){
                $article['images'] = $this->GetImages($article['id']);
            }
			//$result->close();
			return $articles;
		}			
		
		return 0;	
	}	
	
	public function GetPortfolioArticles(){

        if($result = $this->query("SELECT count(a.id) as numArticles, c.*
                                            FROM category c
                                            LEFT JOIN articles a ON a.category=c.id                                            
                                            GROUP by c.id
                                            HAVING count(a.id) > 0;")) {
            $categories = $this->fetchAll($result);//$result->fetch_all(MYSQLI_ASSOC);

            foreach ($categories as $k => $cat){
                $result = $this->query("
				SELECT 
					a.id id,
					c.id catID,
					a.title,
					c.title category,
					a.message,
					im.id imageID
				FROM articles a
					LEFT JOIN category c ON c.id = a.category
					LEFT JOIN images im ON im.articleid = a.id
				WHERE 
				c.id = ".$cat['id']." AND (
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id)>0 AND
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id AND images.first>0)>0 AND
					im.first>0 
				OR
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id)>0 AND
					(SELECT COUNT(*) FROM images WHERE images.articleid=a.id AND images.first>0)=0	
					)
				ORDER BY RAND()
				LIMIT 0,4;");

                $categories[$k]['articles'] = $this->fetchAll($result); //$result->fetch_all(MYSQLI_ASSOC);
                foreach ($categories[$k]['articles'] as &$article){
                    $article['images'] = $this->GetImages($article['id']);
                }
            }
            //$result->close();
            return $categories;
        }
        return false;
    }

	//////////////////////////////////////////////////////////////////////////////////
	//admin
	public function GetArticleTitleArray($cat = -1){
		$array = array();
		$result = 0; 
		
		if($cat>=0) {
			$result = $this->query("SELECT articles.title, articles.id, articles.frontpage, articles.category, category.title as catname FROM articles LEFT JOIN category ON articles.category=category.id WHERE catid='$cat';");			
		}else{
			$result = $this->query("SELECT articles.title, articles.id, articles.frontpage, articles.category, category.title as catname FROM articles LEFT JOIN category ON articles.category=category.id;");						
		}
		if($result){
			while($obj = $result->fetch_array(MYSQLI_ASSOC)){
				array_push($array, array('id'=>$obj['id'], 'title'=>$obj['title'], 'category'=>$obj['catname'], 'catid'=>$obj['category'], 'frontpage'=>$obj['frontpage']));
			}
			$result->close();
		}		
		return $array;
	}		
	public function GetArticlesArray($cat = -1){
		$array = array();
		$result = 0; 
		
		if($cat>=0) {
			$result = $this->query("SELECT articles.*, category.id as catid, category.title as catname FROM articles LEFT JOIN category ON articles.category=category.id WHERE category.id='$cat';");
		}else{
			$result = $this->query("SELECT articles.*, category.title as catname FROM articles LEFT JOIN category ON articles.category=category.id;");						
		}
		if($result){
			while($obj = $result->fetch_array(MYSQLI_ASSOC)){
				array_push($array, array('id'=>$obj['id'],
                    'title'=>$obj['title'],
                    'message'=>$obj['message'],
                    'category'=>$obj['catname'],
                    'catid'=>$obj['category'],
                    'images' => $this->GetImages($obj['id']),
                    'frontpage'=>$obj['frontpage']));
			}
			$result->close();
		}		
		return $array;
	}
	public function GetCategories(){
		$stat = [];
        if ($result = $this->query("SELECT count(a.id) as numArticles, c.*
                                            FROM category c
                                            LEFT JOIN articles a ON a.category=c.id
                                            GROUP by c.id
                                            ORDER BY title;")){

			while($obj = $result->fetch_array(MYSQLI_ASSOC)){
				array_push($stat, $obj);
			}
			$result->close();	
		}
		return $stat;		
	}
	public function CreateCategory($name){
		$name = $this->escape_string($name);		
		if ($result = $this->real_query("INSERT INTO category VALUES (NULL,'$name');")){
			return $this->insert_id;		
		}
		return 0;					
	}
	public function RenameCategory($name, $id){
		$name = $this->escape_string($name);		
		if(settype($id, 'integer') && $result = $this->real_query("UPDATE  category SET  title='$name' WHERE id ='$id';")){
			return 1;
		}
		return 0;					
	}
	public function DeleteCategory($id){
		if(settype($id, 'integer') && $result = $this->real_query("SELECT articles.id FROM articles WHERE category='$id';")){
			$result = $this->store_result();
			if($result->num_rows>0){
				$result->close();				
				return 2;	//
			}else{
				$result = $this->real_query("DELETE FROM category WHERE id='$id';");
			}
			return 0;
		}
		return 1;		
	}			
	public function CreateArticle($category, $title, $message=''){
		$title = $this->escape_string($title);
        $message = $this->escape_string($message);
        if(settype($category, 'integer') && $result = $this->real_query("INSERT INTO articles (id,title,message,category) VALUES (NULL, '$title', '$message', '$category');")){
			return $this->insert_id;			
		}
		return 0;
	}
	public function GetArticle($id){
		$array = array();
		$result = 0; 
		
		if(settype($id, 'integer') && $result = $this->query("SELECT articles.*, category.title as catname FROM articles LEFT JOIN category ON articles.category=category.id WHERE articles.id='$id';")){
			$obj = $result->fetch_array(MYSQLI_ASSOC);
			$array = [
			    'id'=>$obj['id'],
                'title'=>$obj['title'],
                'message'=>$obj['message'],
                'category'=>$obj['catname'],
                'catid'=>$obj['category'],
                'frontpage'=>$obj['frontpage'],
                'images' => $this->GetImages($id)
            ];
			$result->close();
		}		
		return $array;
	}	
	public function ChangeArticleCategory($id, $newcat){
		if(settype($id, 'integer') && settype($newcat, 'integer') && $result = $this->real_query("UPDATE  articles SET  category='$newcat' WHERE  id ='$id';")){
			return 1;
		}
		return 0;		
	}
	public function UpdateArticle($id, $title, $message, $frontpage,$category = null){
		$title = $this->escape_string($title);
		$message = $this->escape_string($message);				
		if(settype($id, 'integer') && settype($frontpage, 'integer') && $result = $this->real_query("UPDATE  articles SET  title='$title',message='$message',frontpage='$frontpage' WHERE  id ='$id';")){
			if($category !== null){
			    $this->ChangeArticleCategory($id, $category);
            }
		    return 1;
		}
		return 0;		
	}
	public function RemoveArticle($id){
		if(settype($id, 'integer') && $result = $this->real_query("DELETE FROM articles WHERE id ='$id';")){
			$this->RemoveAttachedImages($id);	
			return 1;
		}
		return 0;		
	}
	public function CreateImage($article_id){
		if(settype($article_id, 'integer') && $result = $this->real_query("INSERT INTO images (id, articleid, first) VALUES (NULL, '$article_id', 'false');")){
			return $this->insert_id;			
		}
		return -1;		
	}
	public function RemoveImage($id){
		if(settype($id, 'integer') && $result = $this->real_query("DELETE FROM images WHERE id='$id';")){
			unlink('../content/'.$id.'.jpeg');
			unlink('../content/'.$id.'_icon.jpeg');
			return 1;
		}
		return 0;		
	}
	public function RemoveAttachedImages($articleid){
		$arr = $this->GetImages($articleid);
		if(is_array($arr)){
			foreach ($arr as $key => $value){
				$this->RemoveImage($value['id']);
			}			
		}		
	}	
	public function GetImages($article_id){
		$stat = array();
		if (settype($article_id, 'integer') 
		&& $result = $this->query("SELECT i.*, c.id as catId FROM images i
                                            LEFT JOIN articles a ON a.id=i.articleid
                                            LEFT JOIN category c on c.id=a.category
                                            WHERE i.articleid='$article_id';")){

//			while($obj = $result->fetch_array(MYSQLI_ASSOC)){
//				array_push($stat, array('id'=>$obj['id'],
//										'imageID'=>$obj['id'],
//										'first'=>$obj['first']));
//			}

            $stat = $this->fetchAll($result);//$result->fetch_all(MYSQLI_ASSOC);
			//$result->close();
			return $stat;	
		}
		return 0;				
	}
    public function GetAllImages(){
        $stat = [];
        if (settype($article_id, 'integer')
            && $result = $this->query("SELECT i.*, c.id as catId FROM images i
                                            LEFT JOIN articles a ON a.id=i.articleid
                                            LEFT JOIN category c on c.id=a.category ORDER BY c.id ASC;")){
            $stat = $this->fetchAll($result);//$result->fetch_all(MYSQLI_ASSOC);
            //$result->close();
            return $stat;
        }
        return 0;
    }
	public function GetImage($id){
		$result = 0; 		
		if(settype($id, 'integer') && $result = $this->query("SELECT * FROM images WHERE id='$id';")){
			$obj = $result->fetch_array(MYSQLI_ASSOC);
			$stat = array();
			array_push($stat, array('id'=>$obj['id'], 'first'=>$obj['first'], 'articleid'=>$obj['articleid'], 'slider'=>$obj['slider']));				
			$result->close();
			return $stat;
		}		
		return 0;
	}
	public function SetImageOptionSlider($id, $val){
		if(settype($id, 'integer') && settype($val, 'integer') && $result = $this->query("UPDATE images SET  slider='$val' WHERE id='$id';")){
			return 1;
		}
		return 0;		
	}
	public function SetImageOptionFront($id){
		/* 
		 UPDATE images im JOIN (SELECT articleid FROM images WHERE id=16) im2 ON im.articleid = im2.articleid SET im.first=IF(im.id = 16, 1,0); 
		*/
		if(settype($id, 'integer') && settype($val, 'integer') && $result = $this->query("UPDATE images im JOIN (SELECT articleid FROM images WHERE id='$id') im2 ON im.articleid = im2.articleid SET im.first=IF(im.id = '$id', 1,0);")){
			return 1;
		}
		return 0;		
	}						
}
?>