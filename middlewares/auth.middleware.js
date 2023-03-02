export function auth(req,res,next){
    if(req.session.logged){
        next()
    } else {
        res.redirect('/')
    }
}

export function isLogged(req,res,next){
    if(req.session.logged == true){
        res.redirect('/views/profile')
    } else{
        next()
    }
}