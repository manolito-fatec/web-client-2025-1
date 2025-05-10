import { mount } from '@vue/test-utils';
import { expect, test, vi, beforeEach } from 'vitest';
import LoginView from '../src/views/LoginView.vue';
import { useAuthStore } from '../src/api/session/stores/auth';
import router from '../src/router';

// Mock the auth store and router
vi.mock('../src/api/session/stores/auth.ts', () => ({
    useAuthStore: vi.fn(() => ({
        loginAndStore: vi.fn()
    }))
}));

vi.mock('../src/router', () => ({
    default: {
        push: vi.fn()
    }
}));

beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
});

test('Should validate username length correctly', async () => {
    // Arrange
    const wrapper = mount(LoginView);
    const longUsername = 'a'.repeat(256); // 256 characters

    // Act
    await wrapper.find('#username').setValue(longUsername);

    // Assert
    expect(wrapper.vm.userNameError).toBe('Username must be less than 255 characters');
    expect(wrapper.find('.p-error').text()).toContain('Username must be less than 255 characters');
});

test('Should validate password presence correctly', async () => {
    // Arrange
    const wrapper = mount(LoginView);

    // Act - set and clear password
    await wrapper.find('#password').setValue('test');
    await wrapper.find('#password').setValue('');

    // Assert
    expect(wrapper.vm.passwordError).toBe('Password is required');
    expect(wrapper.find('.p-error').text()).toContain('Password is required');
});

test('Should successfully login with valid credentials', async () => {
    // Arrange
    const mockLogin = vi.fn().mockResolvedValue(true);
    (useAuthStore as any).mockImplementation(() => ({
        loginAndStore: mockLogin
    }));

    const wrapper = mount(LoginView);
    sessionStorage.setItem('token', 'mock-token');

    // Act
    await wrapper.find('#username').setValue('validuser');
    await wrapper.find('#password').setValue('validpass');
    await wrapper.find('button').trigger('click');

    // Assert
    expect(mockLogin).toHaveBeenCalledWith('validuser', 'validpass');
    expect(router.push).toHaveBeenCalledWith('/dashboard');
    expect(wrapper.vm.loginError).toBeNull();
});

test('Should show error message when login fails', async () => {
    // Arrange
    const mockLogin = vi.fn().mockResolvedValue(false);
    (useAuthStore as any).mockImplementation(() => ({
        loginAndStore: mockLogin
    }));

    const wrapper = mount(LoginView);

    // Act
    await wrapper.find('#username').setValue('invaliduser');
    await wrapper.find('#password').setValue('invalidpass');
    await wrapper.find('button').trigger('click');

    // Assert
    expect(mockLogin).toHaveBeenCalledWith('invaliduser', 'invalidpass');
    expect(wrapper.vm.loginError).toBe('Invalid username or password');
    expect(wrapper.find('.p-error').text()).toBe('Invalid username or password');
});

test('Should show error message when login throws exception', async () => {
    // Arrange
    const mockLogin = vi.fn().mockRejectedValue(new Error('API error'));
    (useAuthStore as any).mockImplementation(() => ({
        loginAndStore: mockLogin
    }));

    const wrapper = mount(LoginView);

    // Act
    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('#password').setValue('testpass');
    await wrapper.find('button').trigger('click');

    // Assert
    expect(mockLogin).toHaveBeenCalledWith('testuser', 'testpass');
    expect(wrapper.vm.loginError).toBe('Login failed. Please try again.');
    expect(wrapper.find('.p-error').text()).toContain('Login failed. Please try again.');
});

test('Should not attempt login when validation fails', async () => {
    // Arrange
    const mockLogin = vi.fn();
    (useAuthStore as any).mockImplementation(() => ({
        loginAndStore: mockLogin
    }));

    const wrapper = mount(LoginView);

    // Act
    await wrapper.find('button').trigger('click');

    // Assert
    expect(mockLogin).not.toHaveBeenCalled();
    expect(wrapper.vm.userNameError).toBeNull();
    expect(wrapper.vm.passwordError).toBeTruthy();
});