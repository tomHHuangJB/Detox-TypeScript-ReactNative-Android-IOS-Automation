package com.detoxtypescriptreactnativeandroidiosautomation;

import androidx.test.ext.junit.runners.AndroidJUnit4;
import androidx.test.filters.LargeTest;

import com.wix.detox.Detox;
import com.wix.detox.config.DetoxConfig;

import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(AndroidJUnit4.class)
@LargeTest
public class DetoxTest {
    @Rule
    public DetoxConfig detoxConfig = new DetoxConfig();

    @Test
    public void runDetoxTests() {
        Detox.runTests(detoxConfig);
    }
}
