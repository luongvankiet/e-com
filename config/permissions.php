<?php

return [
    'default_permissions' => [
        'user_management' => [
            // Users Management Permissions
            [
                'name' => 'users.view-any',
                'description' => 'Can view all users.',
            ],
            [
                'name' => 'users.view',
                'description' => 'Can view user detail.',
            ],
            [
                'name' => 'users.create',
                'description' => 'Can create users.',
            ],
            [
                'name' => 'users.update',
                'description' => 'Can update users.',
            ],
            [
                'name' => 'users.delete',
                'description' => 'Can delete users.',
            ],
            [
                'name' => 'users.restore',
                'description' => 'Can restore users.',
            ],
            [
                'name' => 'users.force-delete',
                'description' => 'Can permanent delete users.',
            ],
            [
                'name' => 'users.assign-roles',
                'description' => 'Can assign roles to users.',
            ],
            // Roles Management Permissions
            [
                'name' => 'roles.view-any',
                'description' => 'Can view all roles.',
            ],
            [
                'name' => 'roles.view',
                'description' => 'Can view role detail.',
            ],
            [
                'name' => 'roles.create',
                'description' => 'Can create roles.',
            ],
            [
                'name' => 'roles.update',
                'description' => 'Can update roles.',
            ],
            [
                'name' => 'roles.delete',
                'description' => 'Can delete roles.',
            ],
            [
                'name' => 'roles.assign-permissions',
                'description' => 'Can assign permissions to role.',
            ],
        ],
        'product_management' => [
            // Products Management Permissions
            [
                'name' => 'products.view-any',
                'description' => 'Can view all products.',
            ],
            [
                'name' => 'products.view',
                'description' => 'Can view product detail.',
            ],
            [
                'name' => 'products.create',
                'description' => 'Can add products.',
            ],
            [
                'name' => 'products.update',
                'description' => 'Can update products.',
            ],
            [
                'name' => 'products.delete',
                'description' => 'Can delete products.',
            ],
            [
                'name' => 'products.restore',
                'description' => 'Can restore products.',
            ],
            [
                'name' => 'products.force-delete',
                'description' => 'Can permanent delete products.',
            ],

            // Categories Management Permissions
            [
                'name' => 'categories.view-any',
                'description' => 'Can view all product categories.',
            ],
            [
                'name' => 'categories.view',
                'description' => 'Can view product category detail.',
            ],
            [
                'name' => 'categories.create',
                'description' => 'Can add product categories.',
            ],
            [
                'name' => 'categories.update',
                'description' => 'Can update product categories.',
            ],
            [
                'name' => 'categories.delete',
                'description' => 'Can delete product categories.',
            ],
            [
                'name' => 'categories.restore',
                'description' => 'Can restore categories.',
            ],
            [
                'name' => 'categories.force-delete',
                'description' => 'Can permanent delete categories.',
            ],

            // Brands Management Permissions
            [
                'name' => 'brands.view-any',
                'description' => 'Can view all product brands.',
            ],
            [
                'name' => 'brands.view',
                'description' => 'Can view product brand detail.',
            ],
            [
                'name' => 'brands.create',
                'description' => 'Can add product brands.',
            ],
            [
                'name' => 'brands.update',
                'description' => 'Can update product brands.',
            ],
            [
                'name' => 'brands.delete',
                'description' => 'Can delete product brands.',
            ],
            [
                'name' => 'brands.restore',
                'description' => 'Can restore brands.',
            ],
            [
                'name' => 'brands.force-delete',
                'description' => 'Can permanent delete brands.',
            ],
            // Add more product-related permissions
        ],
        'order_management' => [
            [
                'name' => 'orders.view-any',
                'description' => 'Can view all orders.',
            ],
            [
                'name' => 'orders.view',
                'description' => 'Can view order detail.',
            ],
            [
                'name' => 'orders.create',
                'description' => 'Can create orders.',
            ],
            [
                'name' => 'orders.update',
                'description' => 'Can update order details.',
            ],
            [
                'name' => 'orders.delete',
                'description' => 'Can delete orders.',
            ],
            [
                'name' => 'orders.restore',
                'description' => 'Can restore orders.',
            ],
            [
                'name' => 'orders.force-delete',
                'description' => 'Can permanent delete orders.',
            ],
            // Add more order-related permissions
        ],
        'marketing_management' => [
            [
                'name' => 'campaigns.view-any',
                'description' => 'Can view all marketing campaigns.',
            ],
            [
                'name' => 'campaigns.view',
                'description' => 'Can view marketing campaign detail.',
            ],
            [
                'name' => 'campaigns.create',
                'description' => 'Can create marketing campaigns.',
            ],
            [
                'name' => 'campaigns.update',
                'description' => 'Can update marketing campaigns.',
            ],
            [
                'name' => 'campaigns.delete',
                'description' => 'Can delete marketing campaigns.',
            ],
            [
                'name' => 'campaigns.restore',
                'description' => 'Can restore campaigns.',
            ],
            [
                'name' => 'campaigns.force-delete',
                'description' => 'Can permanent delete campaigns.',
            ],
            [
                'name' => 'promotions.view-any',
                'description' => 'Can view all promotions.',
            ],
            [
                'name' => 'promotions.view',
                'description' => 'Can view promotion detail.',
            ],
            [
                'name' => 'promotions.create',
                'description' => 'Can create promotions.',
            ],
            [
                'name' => 'promotions.update',
                'description' => 'Can update promotions.',
            ],
            [
                'name' => 'promotions.delete',
                'description' => 'Can delete promotions.',
            ],
            [
                'name' => 'promotions.restore',
                'description' => 'Can restore promotions.',
            ],
            [
                'name' => 'promotions.force-delete',
                'description' => 'Can permanent delete promotions.',
            ],
            // Add more marketing-related permissions
        ],
        'customer_service_management' => [
            [
                'name' => 'customer_support.view',
                'description' => 'Can view customer support tickets.',
            ],
            [
                'name' => 'customer_support.update',
                'description' => 'Can update customer support tickets.',
            ],
            // Add more customer service-related permissions
        ],
        'analytics_reporting' => [
            [
                'name' => 'reports.view',
                'description' => 'Can view reports.',
            ],
            // Add more analytics and reporting-related permissions
        ],
        'financial_management' => [
            [
                'name' => 'finance.view',
                'description' => 'Can view financial records.',
            ],
            [
                'name' => 'finance.manage',
                'description' => 'Can manage financial records.',
            ],
            // Add more finance-related permissions
        ],
        'system_settings' => [
            [
                'name' => 'settings.view',
                'description' => 'Can view system settings.',
            ],
            [
                'name' => 'settings.update',
                'description' => 'Can update system settings.',
            ],
            // Add more system settings-related permissions
        ],
        'dashboard' => [
            [
                'name' => 'dashboard.view',
                'description' =>  'Can access to dashboard',
            ]
        ],
    ],
    'default_roles' => [
        'super_admin' => [
            'name' => 'super_admin',
            'display_name' => 'Super Admin',
            'description' => 'Full control over the platform. This role has unrestricted access to all features and data.'
        ],
        'admin' => [
            'name' => 'admin',
            'display_name' => 'Admin',
            'description' => 'High-level access but potentially with some restrictions imposed by the Super Admin, primarily focusing on day-to-day operations.',
        ],
        'customer' => [
            'name' => 'customer',
            'display_name' => 'Customer',
            'description' => 'Standard user role for shoppers on the platform, with permissions to manage their profile, orders, and interact with customer service.',
            'permissions' => [
                'products.view-any',
                'products.view',

                // Category Management
                'categories.view-any',
                'categories.view',

                // Brand Management
                'brands.view-any',
                'brands.view',

                // Order Management
                'orders.view-any',
                'orders.view',

                // Marketing Management
                'campaigns.view-any',
                'campaigns.view',

                // Promotion Management
                'promotions.view-any',
                'promotions.view',
            ],
        ]
    ],
];
