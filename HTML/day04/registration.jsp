<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
  </head>
  <body class="bg-light">
    <%
        request.setCharacterEncoding("UTF-8");
        String id = request.getParameter("ID");
        out.print(id);
    %>
  </body>
</html>
