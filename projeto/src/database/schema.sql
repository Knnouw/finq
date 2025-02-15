-- Users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE subscriptions (
    subscription_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    status VARCHAR(20) NOT NULL, -- 'active', 'cancelled', 'expired'
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    amount DECIMAL(10,2) DEFAULT 30.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR(10) NOT NULL, -- 'income' or 'expense'
    description VARCHAR(255),
    date DATE NOT NULL,
    payment_method VARCHAR(50),
    receipt_image_url VARCHAR(255),
    recurring BOOLEAN DEFAULT FALSE,
    notification_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Budgets table
CREATE TABLE budgets (
    budget_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    amount DECIMAL(10,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial Goals table
CREATE TABLE financial_goals (
    goal_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    target_amount DECIMAL(10,2) NOT NULL,
    current_amount DECIMAL(10,2) DEFAULT 0.00,
    deadline DATE,
    status VARCHAR(20) DEFAULT 'in_progress', -- 'in_progress', 'completed', 'cancelled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investment Types table
CREATE TABLE investment_types (
    type_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    risk_level VARCHAR(20), -- 'low', 'medium', 'high'
    description TEXT
);

-- Investments table
CREATE TABLE investments (
    investment_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    type_id INTEGER REFERENCES investment_types(type_id),
    name VARCHAR(100) NOT NULL,
    initial_amount DECIMAL(15,2) NOT NULL,
    current_amount DECIMAL(15,2) NOT NULL,
    expected_return_rate DECIMAL(5,2),
    start_date DATE NOT NULL,
    maturity_date DATE,
    status VARCHAR(20) NOT NULL, -- 'active', 'completed', 'cancelled'
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investment Transactions table
CREATE TABLE investment_transactions (
    transaction_id SERIAL PRIMARY KEY,
    investment_id INTEGER REFERENCES investments(investment_id),
    type VARCHAR(20) NOT NULL, -- 'deposit', 'withdrawal', 'dividend', 'interest'
    amount DECIMAL(15,2) NOT NULL,
    date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Installments table
CREATE TABLE installments (
    installment_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    description VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    installment_amount DECIMAL(10,2) NOT NULL,
    total_installments INTEGER NOT NULL,
    current_installment INTEGER NOT NULL,
    start_date DATE NOT NULL,
    due_date DATE NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(20) NOT NULL, -- 'active', 'completed', 'cancelled'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spending Alerts table
CREATE TABLE spending_alerts (
    alert_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    threshold_amount DECIMAL(10,2) NOT NULL,
    frequency VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly'
    notification_type VARCHAR(20)[], -- Array of notification types: 'email', 'push', 'sms'
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payment Methods table
CREATE TABLE payment_methods (
    method_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'credit_card', 'debit_card', 'bank_account', 'pix', 'cash'
    last_digits VARCHAR(4),
    expiry_date DATE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports Settings table
CREATE TABLE report_settings (
    setting_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    report_type VARCHAR(50) NOT NULL, -- 'spending', 'investment', 'installment'
    frequency VARCHAR(20) NOT NULL, -- 'daily', 'weekly', 'monthly'
    email_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE installments ENABLE ROW LEVEL SECURITY;
ALTER TABLE spending_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_settings ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY user_isolation ON users
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY subscription_isolation ON subscriptions
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY transaction_isolation ON transactions
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY budget_isolation ON budgets
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY goal_isolation ON financial_goals
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY investment_isolation ON investments
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY investment_transaction_isolation ON investment_transactions
    FOR ALL
    USING (investment_id IN (SELECT investment_id FROM investments WHERE user_id = auth.uid()));

CREATE POLICY installment_isolation ON installments
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY alert_isolation ON spending_alerts
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY payment_method_isolation ON payment_methods
    FOR ALL
    USING (user_id = auth.uid());

CREATE POLICY report_setting_isolation ON report_settings
    FOR ALL
    USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_transactions_user_date ON transactions(user_id, date);
CREATE INDEX idx_budgets_user_date ON budgets(user_id, start_date, end_date);
CREATE INDEX idx_subscriptions_user_status ON subscriptions(user_id, status);
CREATE INDEX idx_goals_user_status ON financial_goals(user_id, status);
CREATE INDEX idx_investments_user_status ON investments(user_id, status);
CREATE INDEX idx_investment_transactions_date ON investment_transactions(date);
CREATE INDEX idx_installments_user_status ON installments(user_id, status);
CREATE INDEX idx_installments_due_date ON installments(due_date);
CREATE INDEX idx_payment_methods_user ON payment_methods(user_id);
CREATE INDEX idx_spending_alerts_user ON spending_alerts(user_id);

-- Insert default investment types
INSERT INTO investment_types (name, risk_level, description) VALUES
    ('Savings Account', 'low', 'Traditional savings account with low risk and low return'),
    ('Certificate of Deposit', 'low', 'Fixed-term deposit with guaranteed return'),
    ('Government Bonds', 'low', 'Government-issued debt securities'),
    ('Corporate Bonds', 'medium', 'Company-issued debt securities'),
    ('Stocks', 'high', 'Company shares traded on stock exchanges'),
    ('Mutual Funds', 'medium', 'Professionally managed investment pools'),
    ('Real Estate Funds', 'medium', 'Investment funds focused on real estate'),
    ('Cryptocurrency', 'high', 'Digital or virtual currencies');
