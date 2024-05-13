import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import 'signup.dart';
import 'dashboard.dart';
import 'forgot_password.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String emailErrorMessage = '';
  String passwordErrorMessage = '';

  final storage = const FlutterSecureStorage();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QuickPark'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Image.asset(
                'assets/images/login_image.png',
                height: 200,
              ),
              const SizedBox(height: 16.0),
              TextField(
                controller: emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  prefixIcon: const Icon(Icons.email),
                  errorText:
                      emailErrorMessage.isNotEmpty ? emailErrorMessage : null,
                ),
              ),
              const SizedBox(height: 16.0),
              TextField(
                controller: passwordController,
                decoration: InputDecoration(
                  labelText: 'Password',
                  prefixIcon: const Icon(Icons.lock),
                  errorText: passwordErrorMessage.isNotEmpty
                      ? passwordErrorMessage
                      : null,
                ),
                obscureText: true,
              ),
              const SizedBox(height: 16.0),
              ElevatedButton(
                child: const Text('Login'),
                onPressed: () async {
                  // Reset existing error messages
                  setState(() {
                    emailErrorMessage = '';
                    passwordErrorMessage = '';
                  });

                  // Check if email field is empty
                  if (emailController.text.isEmpty) {
                    setState(() {
                      emailErrorMessage = 'Email is required';
                    });
                    return;
                  }

                  // Check if email has a valid format
                  const emailPattern =
                      r'^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$';
                  final emailRegExp = RegExp(emailPattern);
                  if (!emailRegExp.hasMatch(emailController.text)) {
                    setState(() {
                      emailErrorMessage = 'Invalid email format';
                    });
                    return;
                  }

                  // Check if password field is empty
                  if (passwordController.text.isEmpty) {
                    setState(() {
                      passwordErrorMessage = 'Password is required';
                    });
                    return;
                  }

                  // Check if password has at least 6 characters
                  if (passwordController.text.length < 6) {
                    setState(() {
                      passwordErrorMessage =
                          'Password must be at least 6 characters long';
                    });
                    return;
                  }

                  // Prepare the login data
                  var loginData = {
                    'email': emailController.text,
                    'password': passwordController.text,
                  };

                  // Send a POST request
                  var response = await http.post(
                    Uri.parse('http://10.0.2.2:8000/user/login'),
                    headers: {'Content-Type': 'application/json'},
                    body: jsonEncode(loginData),
                  );

                  // Check the response status
                  if (response.statusCode == 202) {
                    // Login successful
                    // Send a POST request to obtain the access and refresh tokens
                    var tokenResponse = await http.post(
                      Uri.parse('http://10.0.2.2:8000/api/token'),
                      headers: {'Content-Type': 'application/json'},
                      body: jsonEncode(loginData),
                    );

                    // Check the token response status
                    if (tokenResponse.statusCode == 200) {
                      // Tokens obtained successfully
                      var tokenData = jsonDecode(tokenResponse.body);

                      // Extract the access and refresh tokens from the response
                      var accessToken = tokenData['access'];
                      var refreshToken = tokenData['refresh'];

                      // Store the tokens locally
                      await storage.write(
                          key: 'access_token', value: accessToken);
                      await storage.write(
                          key: 'refresh_token', value: refreshToken);
                    }

                    // Navigate to the DashboardPage
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => DashboardPage()),
                    );
                  } else {
                    setState(() {
                      emailErrorMessage = 'Invalid email or password';
                      passwordErrorMessage = 'Invalid email or password';
                    });
                  }
                },
              ),
              TextButton(
                child: const Text('Create New Account'),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => SignupPage()),
                  );
                },
              ),
              TextButton(
                child: const Text('Forgot Password?'),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => ForgotPasswordPage()),
                  );
                },
              ),
              const SizedBox(height: 16.0),
            ],
          ),
        ),
      ),
    );
  }
}