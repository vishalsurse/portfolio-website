body{
    margin:0;
    font-family:'Poppins',sans-serif;
    color:white;
    overflow-x:hidden;

    background: linear-gradient(
    -45deg,
    #0f172a,
    #1e3a8a,
    #7c3aed,
    #06b6d4,
    #ff9900
    );

    background-size:400% 400%;

    animation:gradientBG 15s ease infinite;
}

@keyframes gradientBG{

0%{
background-position:0% 50%;
}

50%{
background-position:100% 50%;
}

100%{
background-position:0% 50%;
}

}
