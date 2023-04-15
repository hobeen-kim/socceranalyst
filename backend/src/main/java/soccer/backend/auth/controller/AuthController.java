package soccer.backend.auth.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soccer.backend.auth.dto.MemberRequestDto;
import soccer.backend.auth.dto.MemberResponseDto;
import soccer.backend.auth.dto.TokenDto;
import soccer.backend.auth.service.AuthService;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody @Valid MemberRequestDto requestDto) {

        MemberResponseDto responseDto = authService.signup(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto requestDto) {
        TokenDto token = authService.login(requestDto);
        return ResponseEntity.ok(token);
    }

    @GetMapping("/refreshToken")
    public ResponseEntity<TokenDto> refreshToken(@RequestHeader("X-REFRESH-TOKEN") String refreshToken) {
        TokenDto token = authService.refreshToken(refreshToken);
        return ResponseEntity.ok(token);
    }
}
